import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "./api/pokemon";
import { Pokemon } from "./types/types";
import { useEffect, useRef, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Ellipse from "./assets/Ellipse.png";
import Subtract from "./assets/Subtract.png";
import { Skeleton } from "./components/ui/skeleton";
import { motion } from "motion/react";

function App() {
  const pokemonQuery = useQuery<Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
  });

  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [randomIndex, setRandomIndex] = useState<number>(0);

  const mouseOutsideRef = useRef<HTMLDivElement>(null);

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

  function getRandomIndex() {
    if (!pokemonQuery.data) return;

    const max = pokemonQuery.data.length - 10;
    const newIndex = Math.floor(Math.random() * (max + 1));
    setRandomIndex(newIndex);
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
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center justify-between rounded-xl bg-gray-200 px-6 py-4"
            >
              <Skeleton className="h-full w-full" />
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
        <button
          className="bg-menu rounded-xl px-4 py-2 text-white hover:bg-[#61a63f]"
          onClick={getRandomIndex}
        >
          Shuffle
        </button>
      </div>
      <div
        key={randomIndex}
        className="m-4 grid grid-cols-3 gap-4 px-5 text-xs md:grid-cols-6 md:text-base"
      >
        {pokemonQuery.data
          ?.slice(randomIndex, randomIndex + 10)
          .map((pokemon, index) => (
            <div
              key={index}
              className="bg-menu flex cursor-pointer items-center justify-between rounded-xl px-6 py-4 hover:bg-[#61a63f]"
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
          className="absolute right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white"
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
    </div>
  );
}

export default App;
