import { fetchData } from "../src/apis/pokeapi.js";
import PokemonCard from "../src/components/PokemonCard.js";

const pokemons = await fetchData(25, 10);
console.log(pokemons);

pokemons.map((pokemon) => {
  return PokemonCard(pokemon.name, pokemon.image, pokemon.types);
});
