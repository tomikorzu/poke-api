import { useEffect } from "react";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import { applyBlur } from "../utils/mainFunctions.js";
import PokemonCard from "../components/PokemonCard.jsx";
import pokeBall from "../assets/img/Pokeball.svg";
import { pokemons } from "../utils/variables.js";

const Home = () => {
  useEffect(() => {
    document.title = "Home - PokeAPI";
    // const btn = document.getElementById("btn");
    // btn.addEventListener("click", applyBlur);
  });
  return (
    <div className="fade-in">
      {/* <Loading /> */}
      {/* <button className="btn" id="btn">
        click
      </button> */}
      <div className="back-drop">
        <Navbar />
        <main>
          <div className="cards-container">
            {pokemons.map((pokemon, index) => {
              if (index <= 24) {
                return (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    image={pokemon.image}
                    type={pokemon.type}
                  />
                );
              }
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
