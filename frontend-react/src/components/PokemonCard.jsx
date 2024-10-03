import "./styles/pokemon-card.css";
import { useEffect } from "react";

const PokemonCard = ({ name, image, type }) => {
  useEffect(() => {
    const typeElement = document.querySelectorAll(".card-type");
    const colorText = {
      fire: "#f52f2f",
      water: "#2f71f5",
      grass: "#26ea26",
      bug: "#ecb30c",
    };
    typeElement.forEach((element) => {
      if (element) {
        switch (element.textContent) {
          case "fire":
            element.style.color = colorText.fire;
            break;
          case "water":
            element.style.color = colorText.water;
            break;
          case "grass":
            element.style.color = colorText.grass;
            break;
          case "bug":
            element.style.color = colorText.bug;
            break;
        }
      }
    });
  }, [type]);
  return (
    <>
      <div className="div-center pokemon-card">
        <img src={image} alt="Pokemon" className="card-img" />
        <div className="name-type div-center">
          <h3 className="card-name">{name}</h3>
          <p className="card-type">{type}</p>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
