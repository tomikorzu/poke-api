import PokemonCard from "../src/components/PokemonCard.js";
import { getApi } from "../src/utils/api.js";

let offset = 0;
let limit = 25;

const fetchData = async () => {
  try {
    const pokemons = await getApi(offset, limit);
    pokemons.forEach((pokemon) => {
      PokemonCard(pokemon);
    });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    // ErrorPage()
  }
};

window.onload = fetchData();
