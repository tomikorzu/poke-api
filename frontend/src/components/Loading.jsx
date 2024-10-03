import pokeBall from "../assets/img/Pokeball.svg";
import "./styles/loading.css";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    const loadingTitle = document.querySelector(".loading-title");
    let dots = 0;
    const interval = setInterval(() => {
      dots = (dots + 1) % 4;
      loadingTitle.textContent = "Loading" + ".".repeat(dots);
    }, 500);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="main-center loading">
      <h2 className="loading-title">Loading</h2>
      <img src={pokeBall} alt="" className="img-rotate" />
    </div>
  );
};

export default Loading;
