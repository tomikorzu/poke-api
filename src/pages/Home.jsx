import { useEffect } from "react";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import { applyBlur } from "../utils/mainFunctions.js";

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
          <h1>Home</h1>
        </main>
      </div>
    </div>
  );
};

export default Home;
