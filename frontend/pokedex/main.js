import { fetchData, clearAllPokemons } from "../src/apis/pokeapi.js";
import PokemonCard from "../src/components/PokemonCard.js";
import Loading from "../src/components/Loading.js";

let offset = 0;
let limit = 25;
let currentPage = 1;
let currentRequest = 0;
const pokemonsCardContainer = document.querySelector(".cards-container");
const currentPageIndicator = document.querySelector(".current-page-h3");
const searchInput = document.getElementById("input-search");
const searchButton = document.getElementById("search-btn");

const updateFetch = async (offset, limit, query = "") => {
  const requestId = ++currentRequest;

  pokemonsCardContainer.innerHTML = "";
  clearAllPokemons();

  const { loading, removeLoading } = Loading();

  try {
    const pokemons = await fetchData(offset, limit);

    if (requestId !== currentRequest) {
      return;
    }

    const imgPromises = pokemons.map((pokemon) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = pokemon.image;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    await Promise.all(imgPromises);

    let filteredPokemons = pokemons;

    if (query) {
      filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.includes(query)
      );
    }

    if (filteredPokemons.length) {
      filteredPokemons.forEach((pokemon) => {
        PokemonCard({
          name: pokemon.name,
          img: pokemon.image,
          types: pokemon.types,
        });
      });
    } else{
      const noResults = document.createElement("h3");
      noResults.textContent = "No results found";
      pokemonsCardContainer.appendChild(noResults);
    }
  } catch (error) {
    console.error("There was an error:", error);
  } finally {
    removeLoading();
  }

  updateButtons(filteredPokemons.length);
};

const searchPokemons = () => {
  const query = searchInput.value.trim();
  offset = 0;
  currentPage = 1;
  currentRequest++;
  updateFetch(offset, limit, query);
};

searchButton.addEventListener("click", searchPokemons);

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
  offset = operation === "+" ? offset + limit : offset - limit;
  currentPage = operation === "+" ? currentPage + 1 : currentPage - 1;
  updateFetch(offset, limit);
};

if (currentPage === 1) {
  prevPageBtn.classList.add("disable");
}

const updateButtons = (totalFilteredPokemons) => {
  currentPageIndicator.textContent = `Page ${currentPage}`;

  prevPageBtn.classList.toggle("disable", currentPage === 1);

  const totalPages = Math.ceil(totalFilteredPokemons / limit);
  nextPageBtn.classList.toggle("disable", currentPage >= totalPages);
};

updateFetch(offset, limit);
