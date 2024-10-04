export const getApi = async (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  const pokemonsInfo = [];
  try {
    const response = await fetch(url);
    const data = await response.json();
    const urls = data.results.map((pokemon) => pokemon.url);
    await getApiOfPokemonsData(urls, pokemonsInfo);
    return pokemonsInfo;
  } catch (error) {
    console.error("Error in fetching pokemons url:", error);
    return;
  }
};

const getApiOfPokemonsData = async (urls, pokemonsInfo) => {
  for (const api of urls) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      let img;
      if (data.sprites.other.home.front_default) {
        img = data.sprites.other.home.front_default;
      } else if (data.sprites.other["official-artwork"].front_default) {
        img = data.sprites.other["official-artwork"].front_default;
      } else if (data.sprites.front_default) {
        img = data.sprites.front_default;
      } else {
        img = "../src/assets/img/Pokeball.svg";
      }
      const pokemonData = {
        img: img,
        name: data.name,
        types: data.types.map((type) => type.type.name),
      };
      pokemonsInfo.push(pokemonData);
    } catch (error) {
      console.error("Error in fetching pokemons data:", err);
    }
  }
};
await getApi();
