import { fetchData, clearAllPokemons } from "../src/apis/pokeapi.js";
import PokemonCard from "../src/components/PokemonCard.js";
import Loading from "../src/components/Loading.js";

let offset = 0;
let limit = 25;
let currentPage = 1;
let currentRequest = 0;
let pokemonsList = [];

const pokemonsCardContainer = document.querySelector(".cards-container");
const currentPageIndicator = document.querySelector(".current-page-h3");
const searchInput = document.getElementById("input-search");
const searchButton = document.getElementById("search-btn");

const updateFetch = async (offset, limit) => {
  const requestId = ++currentRequest;

  pokemonsCardContainer.innerHTML = "";
  clearAllPokemons();

  const { loading, removeLoading } = Loading();

  try {
    const pokemons = await fetchData(offset, limit);

    if (requestId !== currentRequest) {
      return;
    }

    pokemonsList = pokemons;

    const imgPromises = pokemons.map((pokemon) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = pokemon.image;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    await Promise.all(imgPromises);

    pokemons.forEach((pokemon) => {
      PokemonCard({
        name: pokemon.name,
        img: pokemon.image,
        types: pokemon.types,
      });
    });
  } catch (error) {
    console.error("There was an error:", error);
  } finally {
    removeLoading();
  }

  updateButtons();
};


const searchPokemons = () => {
  const query = searchInput.value.trim();
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  let found = false;

  pokemonCards.forEach((pokemonCard) => {
    const pokemonName = pokemonCard
    .querySelector(".card-name")
    .textContent.toLowerCase();
    if (pokemonName.includes(query)) {
      pokemonCard.style.display = "block";
      found = true;
    } else {
      pokemonCard.style.display = "none";
    }
  });

  noPokemonText(found);
};

searchButton.addEventListener("click", searchPokemons);

const noPokemonText = (found) => {
  const noPokemon = document.querySelector(".no-pokemon");
  if (!found) {
    if (!noPokemon) {
      const noPokemonMessage = document.createElement("h3");
      noPokemonMessage.textContent = "No Pokémon found";
      noPokemonMessage.className = "no-pokemon fade-in";
      pokemonsCardContainer.appendChild(noPokemonMessage);
    }
  } else if (noPokemon) {
    noPokemon.remove();
  }
};

currentPageIndicator.textContent = `Page ${currentPage}`;

const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("back-page");

nextPageBtn.addEventListener("click", () => {
  nextPrevPage("+");
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage !== 1) {
    nextPrevPage("-");
  }
});

const nextPrevPage = (operation) => {
  if (operation === "+") {
    currentPage += 1;
    offset += limit;
  } else {
    if (currentPage > 1) {
      currentPage--;
      offset -= limit;
    }
  }
  updateFetch(offset, limit);
};

if (currentPage === 1) {
  prevPageBtn.classList.add("disable");
}

const updateButtons = () => {
  currentPageIndicator.textContent = `Page ${currentPage}`;
  prevPageBtn.classList.toggle("disable", currentPage === 1);
};

updateFetch(offset, limit);
