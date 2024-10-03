import { useEffect, useState, useRef } from "react";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import { applyBlur } from "../utils/mainFunctions.js";
import PokemonCard from "../components/PokemonCard.jsx";

const Home = () => {
  useEffect(() => {
    document.title = "Home - PokeAPI";
  });
  return (
    <div className="fade-in">
      <div className="back-drop">
        <Navbar />
        <main>
          <div className="cards-container"></div>
        </main>
      </div>
    </div>
  );
};

export default Home;
