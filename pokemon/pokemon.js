import { fetchPokemon } from "../src/apis/pokeapi.js";
import { setCardTypeColor } from "../src/components/PokemonCard.js";
import { redirectPage } from "../src/utils/mainFunctions.js";

const currentPokemon = localStorage.getItem("pokemon");

document.title = currentPokemon[0].toUpperCase() + currentPokemon.slice(1);

const homeBtn = document.getElementById("home-btn");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");
const statsList = document.querySelector(".stats-list");
const typesList = document.querySelector(".types-list");
const abilitiesList = document.querySelector(".abilities-list");

homeBtn.addEventListener("click", () => redirectPage('/', 'fade-out', 500));

const updateFetch = async () => {
  const pokemon = await fetchPokemon(currentPokemon);
  console.log(pokemon);

  const card = document.querySelector(".pokemon");
  pokemonName.textContent = pokemon.name;
  pokemonImage.src = `${pokemon.image}`;

  pokemon.stats.forEach((stat) => {
    const statElement = document.createElement("li");
    statElement.classList.add("card-stat");
    statElement.textContent = `${stat.name}: ${stat.base_stat}`;
    statsList.appendChild(statElement);
  });

  pokemon.types.forEach((type) => {
    const typeElement = document.createElement("li");
    typeElement.classList.add("card-type");
    typeElement.textContent = type;
    typesList.appendChild(typeElement);
  });
  setCardTypeColor();

  pokemon.abilities.forEach((ability) => {
    const abilityElement = document.createElement("li");
    abilityElement.classList.add("card-ability");
    abilityElement.textContent = ability;
    abilitiesList.appendChild(abilityElement);
  });
};

updateFetch();
