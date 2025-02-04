import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export async function getPokemons() {
  const res = await axiosClient.get("/pokemon");
  return res.data.results;
}

export async function getPokemonDetails(url: string | null) {
  if (url !== null) {
    const res = await axios.get(url);
    return res.data;
  }
}
