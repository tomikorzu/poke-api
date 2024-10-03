import PokemonCard from "../src/components/PokemonCard.js";
import { getApi } from "../src/utils/api.js";
import Loading from "../src/components/Loading.js";

const search = document.getElementById("input-search");
search.addEventListener("input", (event) => {
  const { value } = event.target;
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  pokemonCards.forEach((pokemonCard) => {
    const pokemonName = pokemonCard.querySelector(".card-name").textContent;
    if (pokemonName.includes(value)) {
      pokemonCard.style.display = "block";
    } else {
      pokemonCard.style.display = "none";
    }
  });
});

let offset = 0;
let limit = 25;

const loadingElement = Loading();
const fetchData = async () => {
  try {
    const pokemons = await getApi(offset, limit);
    pokemons.forEach((pokemon) => {
      PokemonCard(pokemon);
    });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    // ErrorPage()
  } finally {
    loadingElement.remove();
  }
};

fetchData();
