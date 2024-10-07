import {
  fetchData,
  clearAllPokemons,
  fetchPokemonsSearch,
} from "./src/apis/pokeapi.js";
import PokemonCard from "./src/components/PokemonCard.js";
import Loading from "./src/components/Loading.js";

let offset = 0;
let limit = 25;
let currentPage = 1;
let currentRequest = 0;
let pokemonsList = [];

const pokemonsCardContainer = document.querySelector(".cards-container");
const currentPageIndicator = document.querySelector(".current-page-h3");
const searchInput = document.getElementById("input-search");
const searchButton = document.getElementById("search-btn");

const seePokemonInfo = () => {
  const pokemonsCards = document.querySelectorAll(".pokemon-card");

  pokemonsCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      let name = card.querySelector(".card-name");
      localStorage.setItem("pokemon", name.textContent);

      setTimeout(() => {
        document.querySelector("body").classList.add("fade-out");
        setTimeout(() => {
          window.location.href = `./pokemon/`;
        }, 500);
      });
    });
  });
};

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
    seePokemonInfo();
  }

  updateButtons();
};

const searchPokemons = async () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    document.querySelector("body").classList.add("fade-out");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    return;
  }
  const { loading, removeLoading } = Loading();
  try {
    const pokemon = await fetchPokemonsSearch(query);

    const imgPromises = pokemon.map((poke) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = poke.image;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    await Promise.all(imgPromises);

    if (pokemon.length !== 0) {
      await renderPokemons(pokemon);
    } else {
      noPokemonText();
    }
  } catch (error) {
    console.error("Error fetching searchPokemons", error);
  } finally {
    removeLoading();
    seePokemonInfo();
  }
};

searchButton.addEventListener("click", () => {
  currentPage = 1;
  searchPokemons();
});

const renderPokemons = async (pokemons) => {
  pokemonsCardContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const pokemonsTrue = pokemons
    .filter((name) => {
      return name.name;
    })
    .map((name) => {
      return name.name;
    });

  for (const pokemon of pokemonsTrue.slice(startIndex, endIndex)) {
    const eachPokemon = await fetchEachPokemonSearch(pokemon);

    await new Promise((resolve) => {
      const img = new Image();
      img.src = eachPokemon.image;
      img.onload = resolve;
      img.onerror = resolve;
    });

    PokemonCard({
      name: eachPokemon.name,
      img: eachPokemon.image,
      types: eachPokemon.types,
    });
  }

  updateButtonsForSearch(pokemons.length);
};

async function fetchEachPokemonSearch(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();

  return {
    name: data.name,
    id: data.id,
    image:
      data.sprites.other.home.front_default || "./src/assets/img/Pokeball.svg",
    types: data.types.map((type) => type.type.name),
    abilities: data.abilities.map((ability) => ability.ability.name),
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
    })),
  };
}

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

const noPokemonText = () => {
  pokemonsCardContainer.innerHTML = "";
  const noPokemonMessage = document.createElement("h3");
  noPokemonMessage.textContent = "No Pokémon found";
  noPokemonMessage.className = "no-pokemon fade-in";
  pokemonsCardContainer.appendChild(noPokemonMessage);
};

currentPageIndicator.textContent = `Page ${currentPage}`;

const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("back-page");

nextPageBtn.addEventListener("click", () => {
  if (searchInput.value.trim().toLowerCase() === "") {
    nextPrevPage("+");
  } else {
    currentPage += 1;
    searchPokemons();
  }
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage !== 1) {
    if (searchInput.value.trim().toLowerCase() === "") {
      nextPrevPage("-");
    } else {
      currentPage -= 1;
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
