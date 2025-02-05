import {
  POKEMON_API_LIMITE_SIZE,
  POKEMON_API_OFFSET_SIZE,
} from "@/constants/primitive";
import { POKEMON_BASE_URL } from "@/constants/urls";
import { PokemonPage } from "@/types/types";
import axios from "axios";

export namespace PokemonService {
  export async function getPokemons(url?: string): Promise<PokemonPage> {
    try {
      const pageUrl =
        url ||
        `${POKEMON_BASE_URL}?offset=${POKEMON_API_OFFSET_SIZE}&limit=${POKEMON_API_LIMITE_SIZE}`;
      const res = await axios.get(pageUrl);

      return res.data;
    } catch (error) {
      return (error as any).json();
    }
  }

  export async function getPokemonDetails(url: string | null) {
    try {
      if (!url) {
        return null;
      }

      const res = await axios.get(url);

      return res.data;
    } catch (error) {
      return (error as any).json();
    }
  }
}
