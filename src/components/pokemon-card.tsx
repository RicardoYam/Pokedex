import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/server/pokemon";
import { Details } from "../types/types";
import { getPokemonCardGradientBg, getPokemonCardStaticBg } from "@/utils/util";
import { POKEMON_DETAILS_QUERY } from "@/constants/query-key";
import PokemonCardSkeleton from "./pokemon-card-skeleton";
import PokemonCardHeader from "./pokemon-card-header";
import PokemonCardStats from "./pokemon-card-stats";
import PokemonCardSprites from "./pokemon-card-sprites";

interface Props {
  currentPokemonUrl: string | null;
  flipToggleDetails: () => void;
}

const PokemonCard = ({ currentPokemonUrl, flipToggleDetails }: Props) => {
  const pokemonDetails = useQuery<Details>({
    queryKey: [`${POKEMON_DETAILS_QUERY}`, currentPokemonUrl],
    queryFn: () => PokemonService.getPokemonDetails(currentPokemonUrl),
  });

  // Get first type
  const pokemonType =
    pokemonDetails.data?.types.slice(0, 1).map((type) => type.type.name)[0] ??
    "";

  const pokemonCardGradient = getPokemonCardGradientBg(pokemonType);
  const pokemonCardStatic = getPokemonCardStaticBg(pokemonType);

  if (pokemonDetails.isLoading) return <PokemonCardSkeleton />;
  if (pokemonDetails.isError)
    return (
      <div className="absolute right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white">
        Something went wrong!
      </div>
    );

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white">
      {/* GRADIENT BG */}
      <div
        className="absolute inset-0 -top-56 h-full w-full"
        style={{
          background: pokemonCardGradient,
          clipPath: "ellipse(100% 60% at 50% 0%)",
        }}
      ></div>

      <PokemonCardHeader
        flipToggleDetails={flipToggleDetails}
        pokemonDetails={pokemonDetails}
      />

      <PokemonCardStats
        pokemonDetails={pokemonDetails}
        pokemonType={pokemonType}
        pokemonCardStatic={pokemonCardStatic}
      />

      <PokemonCardSprites
        pokemonDetails={pokemonDetails}
        pokemonCardStatic={pokemonCardStatic}
      />
    </div>
  );
};

export default PokemonCard;
