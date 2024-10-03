import PokemonCard from "../src/components/PokemonCard.js";
import { getApi } from "../src/apis/pokeapi.js";
import Loading from "../src/components/Loading.js";

const search = document.getElementById("input-search");
search.addEventListener("input", (event) => {
  const found = searchPokemon(event);
  noPokemonText(found);
});

const searchPokemon = (event) => {
  const { value } = event.target;
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  let found = false;

  pokemonCards.forEach((pokemonCard) => {
    const pokemonName = pokemonCard.querySelector(".card-name").textContent;
    if (pokemonName.includes(value)) {
      pokemonCard.style.display = "block";
      found = true;
    } else {
      pokemonCard.style.display = "none";
    }
  });
  return found;
};

const noPokemonText = (found) => {
  const noPokemon = document.querySelector(".no-pokemon");
  if (!found) {
    if (!noPokemon) {
      const noPokemonMessage = document.createElement("h3");
      noPokemonMessage.textContent = "No Pokémon found";
      noPokemonMessage.className = "no-pokemon fade-in";
      document.querySelector(".cards-container").appendChild(noPokemonMessage);
    }
  } else if (noPokemon) {
    noPokemon.remove();
  }
};

let offset = 0;
let limit = 25;

const { loadingElement, removeLoading } = Loading();

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
    removeLoading();
  }
};

fetchData();
