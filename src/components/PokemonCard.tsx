import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../api/pokemon";
import { Details, PokemonStats } from "../types/types";
import {
  convertStat,
  pokemonCardGradientBgClass,
  pokemonCardStaticColor,
} from "@/utils/util";
import { ChevronLeft } from "lucide-react";
import Ellipse from "@/assets/Ellipse.png";
import Subtract from "@/assets/Subtract.png";
import { Skeleton } from "./ui/skeleton";

interface Props {
  currentPokemonUrl: string | null;
  flipToggleDetails: () => void;
}

const PokemonCard = ({ currentPokemonUrl, flipToggleDetails }: Props) => {
  const pokemonDetails = useQuery<Details>({
    queryKey: ["pokemons", { currentPokemonUrl }],
    queryFn: () => getPokemonDetails(currentPokemonUrl),
  });

  // Get first type
  const pokemonType =
    pokemonDetails.data?.types.slice(0, 1).map((type) => type.type.name)[0] ??
    "";

  const pokemonCardGradient = pokemonCardGradientBgClass(pokemonType);
  const pokemonCardStatic = pokemonCardStaticColor(pokemonType);

  if (pokemonDetails.isLoading)
    return (
      <div className="fixed right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white">
        <div className="flex h-full w-full flex-col items-center justify-start gap-14 py-24">
          <Skeleton className="h-52 w-52 rounded-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-[300px] rounded-xl" />
            <Skeleton className="h-10 w-[200px] rounded-xl" />
            <Skeleton className="h-10 w-[100px] rounded-xl" />
          </div>
        </div>
      </div>
    );
  if (pokemonDetails.isError)
    return (
      <div className="absolute right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white">
        {JSON.stringify(pokemonDetails.error)}
      </div>
    );

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white">
      <div
        className="absolute inset-0 -top-56 h-full w-full"
        style={{
          background: pokemonCardGradient,
          clipPath: "ellipse(100% 60% at 50% 0%)",
        }}
      ></div>

      {/* Back button */}
      <div className="relative h-[300px] rounded-b-[100px] px-8">
        {/* LOGO */}
        <div className="relative z-10 flex items-center">
          <img
            className="absolute -right-10 -top-10"
            src={Subtract}
            alt="subtract"
            width={200}
          />
          <img
            className="absolute -right-2 top-8"
            src={Ellipse}
            alt="ellipse"
            width={100}
          />
        </div>

        <div
          className="relative cursor-pointer items-center text-white"
          onClick={flipToggleDetails}
        >
          <button className="absolute -left-2 top-4 flex items-center pr-2 text-xs font-semibold">
            <ChevronLeft width={30} />
            back
          </button>
        </div>

        {/* Name */}
        <p className="z-30 pt-14 text-4xl font-bold capitalize text-white">
          {pokemonDetails.data?.name}
        </p>

        <img
          className="absolute -bottom-20 left-24 z-20"
          src={
            pokemonDetails.data?.sprites.other["official-artwork"].front_default
          }
          alt={"pokemonImage"}
          width={220}
        />
      </div>

      <div className="px-4 py-14">
        {/* TYPE */}
        <div className="flex justify-center py-10">
          <div
            className="flex w-[150px] justify-center rounded-3xl py-1 capitalize"
            style={{ background: pokemonCardStatic }}
          >
            <p className="text-white">{pokemonType}</p>
          </div>
        </div>

        <div className="grid grid-flow-col grid-cols-2 grid-rows-3 gap-6">
          {pokemonDetails.data?.stats.map((stat: PokemonStats, index) => (
            <div className="flex justify-between px-2" key={index}>
              <p
                className="font-extrabold"
                style={{ color: pokemonCardStatic }}
              >
                {convertStat(stat.stat.name)}
              </p>
              <p style={{ color: pokemonCardStatic }}>{stat.base_stat}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sprites */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold" style={{ color: pokemonCardStatic }}>
          Sprites
        </p>

        <div className="grid grid-cols-3">
          <img
            src={pokemonDetails.data?.sprites.front_default}
            alt={"pokemonImage front"}
            width={150}
          />
          <img
            src={pokemonDetails.data?.sprites.back_default}
            alt={"pokemonImage front"}
            width={150}
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
