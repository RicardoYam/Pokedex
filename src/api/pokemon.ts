import { PokemonPage } from "@/types/types";
import axios from "axios";

export async function getPokemons(url?: string): Promise<PokemonPage> {
  const pageUrl = url || `https://pokeapi.co/api/v2/pokemon?offset=0&limit=54`;
  const res = await axios.get(pageUrl);
  return res.data;
}

export async function getPokemonDetails(url: string | null) {
  if (url !== null) {
    const res = await axios.get(url);
    return res.data;
  }
}
