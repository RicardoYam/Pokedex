import { pokemonTypeBgMap, statsMap } from "@/constants/array";
import { pokemonEndColorMap } from "@/constants/color";

export function convertStat(stat: string | null): string {
  if (stat && stat in statsMap) {
    return statsMap[stat];
  }
  return "unknown";
}

export function getPokemonCardGradientBg(type: string | null): string {
  if (type && type in pokemonTypeBgMap) {
    return pokemonTypeBgMap[type];
  }
  return "linear-gradient(to top, #B0AF94, #C9C8AD)";
}

export function getPokemonCardStaticBg(type: string | null): string {
  if (type && type in pokemonEndColorMap) {
    return pokemonEndColorMap[type];
  }
  return "#C9C8AD";
}
