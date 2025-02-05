import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonPage } from "./types/types";
import { useEffect, useMemo, useRef, useState } from "react";
import PokemonCard from "./components/pokemon-card";
import { motion } from "motion/react";
import BeatLoader from "react-spinners/ClipLoader";
import { PokemonService } from "./server/pokemon";
import { POKEMON_BASE_URL } from "./constants/urls";
import {
  POKEMON_API_LIMITE_SIZE,
  POKEMON_API_OFFSET_SIZE,
} from "./constants/primitive";
import { POKEMON_INFINITESCROLL_QUERY } from "./constants/query-key";
import PokemonListSkeleton from "./components/pokemon-list-skeleton";
import PokemonBgCircle from "./assets/pokemon-bg-circle.png";
import PokemonBgRing from "./assets/pokemon-bg-ring.png";

function App() {
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const mouseOutsideRef = useRef<HTMLDivElement>(null);

  const pokemonQuery = useInfiniteQuery<PokemonPage>({
    queryKey: [`${POKEMON_INFINITESCROLL_QUERY}`],
    queryFn: ({
      pageParam = `${POKEMON_BASE_URL}?offset=${POKEMON_API_OFFSET_SIZE}&limit=${POKEMON_API_LIMITE_SIZE}`,
    }) => PokemonService.getPokemons(pageParam as string),
    initialPageParam: `${POKEMON_BASE_URL}?offset=${POKEMON_API_OFFSET_SIZE}&limit=${POKEMON_API_LIMITE_SIZE}`,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const allPokemons = useMemo(() => {
    return pokemonQuery.data?.pages.flatMap((page) => page.results) || [];
  }, [pokemonQuery.data]);

  useEffect(() => {
    function handleScroll() {
      if (
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.scrollHeight
      ) {
        pokemonQuery.fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pokemonQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mouseOutsideRef.current &&
        !mouseOutsideRef.current.contains(event.target as Node)
      ) {
        flipToggleDetails();
      }
    }

    if (toggleDetails) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDetails]);

  function flipToggleDetails() {
    setToggleDetails(false);
    setSelectedPokemon(null);
  }

  if (pokemonQuery.isLoading) return <PokemonListSkeleton />;

  if (pokemonQuery.isError) return <div>something went wrong!</div>;

  return (
    <div>
      {/* LOGO */}
      <div className="relative -z-10 flex items-center">
        <img
          className="absolute -top-40 right-0"
          src={PokemonBgRing}
          alt="subtract"
          width={600}
        />
        <img
          className="absolute right-28 top-20"
          src={PokemonBgCircle}
          alt="ellipse"
          width={250}
        />
      </div>

      {/* HEADER */}
      <div className="flex justify-between p-10">
        <h1 className="text-5xl font-bold">Pokedex</h1>
      </div>

      <div className="m-4 grid grid-cols-3 gap-4 px-5 text-xs md:grid-cols-4 md:text-sm lg:grid-cols-6">
        {allPokemons.map((pokemon, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl bg-menu px-6 py-8 text-center hover:bg-[#61a63f] lg:flex-row lg:justify-between"
            onClick={() => {
              setSelectedPokemon(pokemon.url);
              setToggleDetails(true);
            }}
          >
            <p className="font-semibold text-white">#00{index + 1}</p>
            <p className="font-semibold text-white">
              {pokemon.name.length > 15
                ? `${pokemon.name.substring(0, 15)}...`
                : pokemon.name}
            </p>
          </div>
        ))}
      </div>

      {/* POKEMON LIST */}
      {toggleDetails && selectedPokemon && (
        <motion.div
          className="fixed right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white"
          ref={mouseOutsideRef}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.7 }}
        >
          <PokemonCard
            currentPokemonUrl={selectedPokemon}
            flipToggleDetails={flipToggleDetails}
          />
        </motion.div>
      )}

      {/* INFINITE SCROLL TRIGGER */}
      {pokemonQuery.isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <BeatLoader color="#6DB948" size={50} />
        </div>
      )}

      {!pokemonQuery.hasNextPage && (
        <div className="flex items-center justify-center">
          No more pokemons to load!
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}

export default App;
