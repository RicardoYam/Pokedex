import { Skeleton } from "./ui/skeleton";
import PokemonBgCircle from "@/assets/pokemon-bg-circle.png";
import PokemonBgRing from "@/assets/pokemon-bg-ring.png";

const PokemonListSkeleton = () => {
  return (
    <div>
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

      <div className="p-10">
        <h1 className="text-5xl font-bold">Pokedex</h1>
      </div>

      <div className="m-4 grid grid-cols-6 gap-4 px-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="z-20 h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonListSkeleton;
