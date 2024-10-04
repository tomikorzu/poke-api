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

let currentPage = 1;
let offset = 0;
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
  nextPrevPage("+");
});
const previousPageBtn = document.getElementById("back-page");
previousPageBtn.addEventListener("click", () => {
  if (currentPage !== 1) {
    nextPrevPage("-");
  }
});

const nextPrevPage = (operation) => {
  offset = operation === "+" ? offset + limit : offset - limit;
  currentPage = operation === "+" ? currentPage + 1 : currentPage - 1;
  updateFetch(offset, limit);
  updateButtons();
};

if (currentPage === 1) {
  previousPageBtn.classList.add("disable");
}

const updateButtons = () => {
  currentPageIndictator.textContent = `Page ${currentPage}`;

  if (currentPage === 1) {
    previousPageBtn.classList.add("disable");
  } else {
    previousPageBtn.classList.remove("disable");
  }

  if (pokemonsCardsContainer.children.length < limit) {
    nextPageBtn.classList.add("disable");
  } else {
    nextPageBtn.classList.remove("disable");
  }
};

const { loadingElement, removeLoading } = Loading();
const fetchData = async (offset, limit) => {
  try {
    const pokemons = await getApi(offset, limit);
    pokemons.forEach((pokemon) => {
      PokemonCard(pokemon);
    });
    if (pokemons.length < limit) {
      nextPageBtn.classList.add("disable");
    } else {
      nextPageBtn.classList.remove("disable");
    }
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    // ErrorPage()
  } finally {
    removeLoading();
  }
};

fetchData(offset, limit);
