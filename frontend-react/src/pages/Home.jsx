import { useEffect, useState, useRef } from "react";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import { applyBlur } from "../utils/mainFunctions.js";
import PokemonCard from "../components/PokemonCard.jsx";
import { getApi } from "../utils/variables.js";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [pokemonsInfo, setPokemonsInfo] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);

  useEffect(() => {
    document.title = "Home - PokeAPI";
    const fetchData = async () => {
      setLoading(true);
      try {
        const pokemons = await getApi(offset, limit);
        setPokemonsInfo(pokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="fade-in">
      <div className="back-drop">
        <Navbar />
        <main>
          <div className="cards-container">
            {pokemonsInfo.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.img}
                type={pokemon.type}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
