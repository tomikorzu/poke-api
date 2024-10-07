import { fetchPokemon } from "../src/apis/pokeapi.js";

const currentPokemon = localStorage.getItem("pokemon");

document.title = currentPokemon[0].toUpperCase() + currentPokemon.slice(1);

const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");
const statsList = document.querySelector(".stats-list");
const typesList = document.querySelector(".types-list");

const updateFetch = async () => {
  const pokemon = await fetchPokemon(currentPokemon);
  console.log(pokemon);

  pokemonName.textContent = pokemon.name;
  pokemonImage.src = `${pokemon.image}`;

  pokemon.stats.forEach((stat) => {
    const statElement = document.createElement("li");
    statElement.textContent = `${stat.name}: ${stat.base_stat}`;
    statsList.appendChild(statElement);
  });

  pokemon.types.forEach((type) => {
    const typeElement = document.createElement("li");
    typeElement.textContent = type;
    typesList.appendChild(typeElement);
  });
};

updateFetch();
