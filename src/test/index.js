const url = "https://pokeapi.co/api/v2/pokemon/ditto";

const getApi = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default getApi;
