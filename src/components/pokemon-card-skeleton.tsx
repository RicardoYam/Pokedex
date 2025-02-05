import { Skeleton } from "./ui/skeleton";

const PokemonCardSkeleton = () => {
  return (
    <div className="fixed right-0 top-0 h-full w-[400px] border-l-2 border-black bg-white">
      {/* SKELETON */}
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
};

export default PokemonCardSkeleton;
