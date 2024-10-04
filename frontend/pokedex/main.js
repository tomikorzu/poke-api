import { fetchData } from "../src/apis/pokeapi.js";
import PokemonCard from "../src/components/PokemonCard.js";

const pokemons = await fetchData(0, 25);
console.log(pokemons);

if (pokemons) {
  pokemons.map((pokemon, index) => {
    return PokemonCard({name: pokemon.name, img: pokemon.image, types: pokemon.types});
  });
}
