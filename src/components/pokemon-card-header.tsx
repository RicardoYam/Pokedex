import { ChevronLeft } from "lucide-react";
import PokemonBgCircle from "@/assets/pokemon-bg-circle.png";
import PokemonBgRing from "@/assets/pokemon-bg-ring.png";

interface Props {
  flipToggleDetails: () => void;
  pokemonName: string;
  pokemonImage: string;
}

const PokemonCardHeader = ({
  flipToggleDetails,
  pokemonName,
  pokemonImage,
}: Props) => {
  return (
    <div className="relative h-[300px] rounded-b-[100px] px-8">
      {/* LOGO */}
      <div className="relative z-10 flex items-center">
        <img
          className="absolute -right-10 -top-10"
          src={PokemonBgRing}
          alt="subtract"
          width={200}
        />
        <img
          className="absolute -right-2 top-8"
          src={PokemonBgCircle}
          alt="ellipse"
          width={100}
        />
      </div>

      {/* BUTTON */}
      <div
        className="relative cursor-pointer items-center text-white"
        onClick={flipToggleDetails}
      >
        <button className="absolute -left-2 top-4 flex items-center pr-2 text-xs font-semibold">
          <ChevronLeft width={30} />
          back
        </button>
      </div>

      {/* POKEMON NAME */}
      <p className="z-30 pt-14 text-4xl font-bold capitalize text-white">
        {pokemonName}
      </p>

      {/* POKEMON IMAGE */}
      <img
        className="absolute -bottom-20 left-24 z-20"
        src={pokemonImage}
        alt={"pokemonImage"}
        width={220}
      />
    </div>
  );
};

export default PokemonCardHeader;
