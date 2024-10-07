export const allPokemons = [];

export const fetchData = async (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  const urls = data.results.map((pokemon, index) => {
    return fetchPokemonData(pokemon.url, index);
  });

  await Promise.all(urls);
  return allPokemons.sort((a, b) => a.index - b.index);
};

const fetchPokemonData = async (url, index) => {
  const response = await fetch(url);
  const data = await response.json();
  const newPokemon = {
    name: data.name,
    id: data.id,
    image:
      data.sprites.other.home.front_default || "../src/assets/img/Pokeball.svg",
    types: data.types.map((type) => type.type.name),
    abilities: data.abilities.map((ability) => ability.ability.name),
    stats: data.stats.map((stat) => {
      return {
        name: stat.stat.name,
        base_stat: stat.base_stat,
      };
    }),
    index,
  };

  allPokemons.push(newPokemon);
  return newPokemon;
};

export const clearAllPokemons = () => {
  allPokemons.length = 0;
};

const fetchPokemonsSearch = async (query) => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5"
  );
  const data = await response.json();
  const names = data.results;
  const namesThatIncludesQuery = names.map((name) => {
    return name.name.includes(query);
  });
  return namesThatIncludesQuery;
};

fetchPokemonsSearch("a").then((response) => console.log(response));

export const fetchPokemonByName = async (name) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return {
      name: data.name,
      id: data.id,
      image:
        data.sprites.other.home.front_default ||
        "../src/assets/img/Pokeball.svg",
      types: data.types.map((type) => type.type.name),
      abilities: data.abilities.map((ability) => ability.ability.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      })),
    };
  } catch (err) {
    console.error("There was an error:", err);
    return null;
  }
};
