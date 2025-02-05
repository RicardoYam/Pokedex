import { Details, PokemonStats } from "@/types/types";
import { convertStat } from "@/utils/util";
import { UseQueryResult } from "@tanstack/react-query";

interface Props {
  pokemonDetails: UseQueryResult<Details, Error>;
  pokemonType: string;
  pokemonCardStatic: string;
}

const PokemonCardStats = ({
  pokemonDetails,
  pokemonType,
  pokemonCardStatic,
}: Props) => {
  return (
    <div className="px-4 py-14">
      {/* POKEMON TYPE */}
      <div className="flex justify-center py-10">
        <div
          className="flex w-[150px] justify-center rounded-3xl py-1 capitalize"
          style={{ background: pokemonCardStatic }}
        >
          <p className="text-white">{pokemonType}</p>
        </div>
      </div>

      {/* POKEMON STATS */}
      <div className="grid grid-flow-col grid-cols-2 grid-rows-3 gap-6">
        {pokemonDetails.data?.stats.map((stat: PokemonStats, index) => (
          <div className="flex justify-between px-2" key={index}>
            <p className="font-extrabold" style={{ color: pokemonCardStatic }}>
              {convertStat(stat.stat.name)}
            </p>
            <p style={{ color: pokemonCardStatic }}>{stat.base_stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCardStats;
