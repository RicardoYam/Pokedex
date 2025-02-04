export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonPage {
  results: Pokemon[];
  next: string;
  previous: string;
}

export interface PokemonStats {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Details {
  name: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: PokemonStats[];
}
