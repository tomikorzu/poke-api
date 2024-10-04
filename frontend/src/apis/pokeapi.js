export const allPokemons = [];

export const fetchData = async (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  let urls = await Promise.all(
    data.results.map((pokemon) => {
      return fetchPokemonData(pokemon.url);
    })
  );
  return allPokemons;
};

const fetchPokemonData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const newPokemon = {
    name: data.name,
    id: data.id,
    image: data.sprites.other.home.front_default,
    types: data.types.map((type) => type.type.name),
    abilities: data.abilities.map((ability) => ability.ability.name),
    stats: data.stats.map((stat) => {
      return {
        name: stat.stat.name,
        base_stat: stat.base_stat,
      };
    }),
  };

  allPokemons.push(newPokemon);
  return allPokemons;
};
