import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "./api/pokemon";
import { Pokemon } from "./types/types";
import { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Ellipse from "./assets/Ellipse.png";
import Subtract from "./assets/Subtract.png";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const pokemonQuery = useQuery<Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
  });

  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  function flipToggleDetails() {
    setToggleDetails(false);
    setSelectedPokemon(null);
  }

  if (pokemonQuery.isLoading)
    return (
      <div>
        {/* Background */}
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
              <Skeleton />
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
      <div className="p-10">
        <h1 className="text-5xl font-bold">Pokedex</h1>
      </div>
      <div className="m-4 grid grid-cols-6 gap-4 px-5">
        {pokemonQuery.data?.slice(0, 10).map((pokemon, index) => (
          <div
            key={index}
            className="bg-menu flex cursor-pointer items-center justify-between rounded-xl px-6 py-4"
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
        <PokemonCard
          currentPokemonUrl={selectedPokemon}
          flipToggleDetails={flipToggleDetails}
        />
      )}
    </div>
  );
}

export default App;
