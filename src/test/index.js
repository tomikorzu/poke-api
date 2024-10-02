const url = "https://pokeapi.co/api/v2/pokemon?limit=250";

const getApi = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default getApi;
