import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPokemons } from "./api/pokemon";
import { Pokemon, PokemonPage } from "./types/types";
import { useEffect, useRef, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Ellipse from "./assets/Ellipse.png";
import Subtract from "./assets/Subtract.png";
import { Skeleton } from "./components/ui/skeleton";
import { motion } from "motion/react";
import BeatLoader from "react-spinners/ClipLoader";

function App() {
  const pokemonQuery = useInfiniteQuery<PokemonPage>({
    queryKey: ["pokemons"],
    queryFn: ({
      pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=54",
    }) => getPokemons(pageParam as string),
    initialPageParam: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=54",
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const allPokemons: Pokemon[] =
    pokemonQuery.data?.pages.flatMap((page) => page.results) || [];

  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const mouseOutsideRef = useRef<HTMLDivElement>(null);

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

  if (pokemonQuery.isLoading)
    return (
      <div>
        <div className="relative -z-10 flex items-center">
          <img
            className="absolute -top-40 right-0"
            src={Subtract}
            alt="subtract"
            width={600}
          />
          <img
            className="absolute right-28 top-20"
            src={Ellipse}
            alt="ellipse"
            width={250}
          />
        </div>

        {/* Title */}
        <div className="p-10">
          <h1 className="text-5xl font-bold">Pokedex</h1>
        </div>

        {/* Skeleton */}
        <div className="m-4 grid grid-cols-6 gap-4 px-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="z-20 h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );

  if (pokemonQuery.isError)
    return <div>{JSON.stringify(pokemonQuery.error)}</div>;

  return (
    <div>
      <div className="relative -z-10 flex items-center">
        <img
          className="absolute -top-40 right-0"
          src={Subtract}
          alt="subtract"
          width={600}
        />
        <img
          className="absolute right-28 top-20"
          src={Ellipse}
          alt="ellipse"
          width={250}
        />
      </div>
      <div className="flex justify-between p-10">
        <h1 className="text-5xl font-bold">Pokedex</h1>
      </div>
      <div className="m-4 grid grid-cols-3 gap-4 px-5 text-xs md:grid-cols-6 md:text-base">
        {allPokemons.map((pokemon, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between rounded-xl bg-menu px-6 py-6 hover:bg-[#61a63f]"
            onClick={() => {
              setSelectedPokemon(pokemon.url);
              setToggleDetails(true);
            }}
          >
            <p className="font-semibold text-white">#00{index + 1}</p>
            <p className="font-semibold text-white">{pokemon.name}</p>
          </div>
        ))}
      </div>

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

      {/* Infinite Scroll Trigger */}
      {pokemonQuery.isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <BeatLoader color="#6DB948" size={50} />
        </div>
      )}
      {!pokemonQuery.hasNextPage && <p>No more Pokémon to load</p>}
      <div className="h-10"></div>
    </div>
  );
}

export default App;
