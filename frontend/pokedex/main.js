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

let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
let offset = parseInt(localStorage.getItem("offset")) || 0;
const limit = 25;

const pokemonsCardsContainer = document.querySelector(".cards-container");

const updateFetch = (offset, limit) => {
  pokemonsCardsContainer.innerHTML = "";
  fetchData(offset, limit);
};

const currentPageIndictator = document.querySelector(".current-page-h3");
currentPageIndictator.textContent = `Page ${currentPage}`;

const nextPageBtn = document.getElementById("next-page");
nextPageBtn.addEventListener("click", () => {
  nextPage();
});

const nextPage = () => {
  currentPage += 1;
  localStorage.setItem("currentPage", currentPage);
  offset += 25;
  localStorage.setItem("offset", offset);
  currentPageIndictator.textContent = `Page ${currentPage}`;
  updateFetch(offset, limit);
};

const previousPageBtn = document.getElementById("back-page");
previousPageBtn.addEventListener("click", () => {
  if (currentPage !== 1) {
    previousPage();
  }
});

const previousPage = () => {
  offset -= 25;
  currentPage -= 1;
  localStorage.setItem("currentPage", currentPage);
  localStorage.setItem("offset", offset);
  currentPageIndictator.textContent = `Page ${currentPage}`;
  updateFetch(offset, limit);
};

const { loadingElement, removeLoading } = Loading();
const fetchData = async (offset, limit) => {
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

fetchData(offset, limit);
