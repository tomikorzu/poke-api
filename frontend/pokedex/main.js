import { fetchData, clearAllPokemons } from "../src/apis/pokeapi.js";
import PokemonCard from "../src/components/PokemonCard.js";

let offset = 0;
let limit = 25;
let currentPage = 1;
const pokemonsCardContainer = document.querySelector(".cards-container");
const currentPageIndicator = document.querySelector(".current-page-h3");

const updateFetch = async (offset, limit) => {
  pokemonsCardContainer.innerHTML = "";

  clearAllPokemons()

  const pokemons = await fetchData(offset, limit);

  if (pokemons) {
    pokemons.map((pokemon) => {
      PokemonCard({
        name: pokemon.name,
        img: pokemon.image,
        types: pokemon.types,
      });
    });
  }
  updateButtons();
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
  offset = operation === "+" ? offset + limit : offset - limit;
  currentPage = operation === "+" ? currentPage + 1 : currentPage - 1;
  updateFetch(offset, limit);
};

if (currentPage === 1) {
  prevPageBtn.classList.add("disable");
}

const updateButtons = () => {
  currentPageIndicator.textContent = `Page ${currentPage}`;

  if (currentPage === 1) {
    prevPageBtn.classList.add("disable");
  } else {
    prevPageBtn.classList.remove("disable");
  }

  if (pokemonsCardContainer.children.length < limit) {
    nextPageBtn.classList.add("disable");
  } else {
    nextPageBtn.classList.remove("disable");
  }
};

updateFetch(offset, limit);
