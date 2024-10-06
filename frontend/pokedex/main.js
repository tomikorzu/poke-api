import {
  fetchData,
  clearAllPokemons,
  fetchPokemonByName,
} from "../src/apis/pokeapi.js";
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

const searchPokemons = async () => {
  const query = searchInput.value.trim();

  if (query === "") {
    updateFetch(offset, limit);
    return;
  }

  const pokemon = await fetchPokemonByName(query);

  if (pokemon) {
    renderPokemons([pokemon]);
  } else {
    renderPokemons([]);
    noPokemonText(false);
  }
};

searchButton.addEventListener("click", searchPokemons);

const renderPokemons = (pokemons) => {
  pokemonsCardContainer.innerHTML = "";
  const start = (currentPage - 1) * limit;
  const end = currentPage * limit;
  const pokemonsToShow = pokemons.slice(start, end);

  pokemonsToShow.forEach((pokemon) => {
    PokemonCard({
      name: pokemon.name,
      img: pokemon.image,
      types: pokemon.types,
    });
  });

  updateButtonsForSearch(pokemons.length);
};

const updateButtonsForSearch = (totalResults) => {
  currentPageIndicator.textContent = `Page ${currentPage}`;

  if (currentPage * limit >= totalResults) {
    nextPageBtn.classList.add("disable");
  } else {
    nextPageBtn.classList.remove("disable");
  }

  if (currentPage === 1) {
    prevPageBtn.classList.add("disable");
  } else {
    prevPageBtn.classList.remove("disable");
  }
};

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
  if (searchInput.value.trim() === "") {
    nextPrevPage("+");
  } else {
    currentPage += 1;
    searchPokemons();
  }
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage !== 1) {
    if (searchInput.value.trim() === "") {
      nextPrevPage("-");
    } else {
      searchPokemons();
    }
  }
});

const nextPrevPage = (operation) => {
  if (operation === "+") {
    currentPage += 1;
    offset += limit;
  } else {
    currentPage--;
    offset -= limit;
  }
  updateFetch(offset, limit);
};

if (currentPage === 1) {
  prevPageBtn.classList.add("disable");
}

const updateButtons = () => {
  currentPageIndicator.textContent = `Page ${currentPage}`;
  if (pokemonsList.length < limit) {
    nextPageBtn.classList.add("disable");
  } else {
    nextPageBtn.classList.remove("disable");
  }
  if (currentPage === 1) {
    prevPageBtn.classList.add("disable");
  } else {
    prevPageBtn.classList.remove("disable");
  }
};

updateFetch(offset, limit);
