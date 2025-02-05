import { Details } from "@/types/types";
import { UseQueryResult } from "@tanstack/react-query";

interface Props {
  pokemonDetails: UseQueryResult<Details, Error>;
  pokemonCardStatic: string;
}

const PokemonCardSprites = ({ pokemonDetails, pokemonCardStatic }: Props) => {
  return (
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
  );
};

export default PokemonCardSprites;
