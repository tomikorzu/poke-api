import "./styles/desplegable-menu.css";
import { useEffect } from "react";

const DesplegableMenu = ({ title, buttons }) => {
  useEffect(() => {
    const desplegableDiv = document.querySelector(".desplegable-menu");
    setTimeout(() => {
      desplegableDiv.classList.add("show-desplegable-menu");
    }, 100);
  });
  return (
    <div className="desplegable-menu">
      <h2 className="desplegable-menu-title">{title}</h2>
      <div
        className="desplegable-menu-div"
      >
        {buttons.map((btn, index)=> {
            return (
                <button key={index}><i>{btn.icon}</i>{btn.text}</button>
            )
        })}
      </div>
    </div>
  );
};

export default DesplegableMenu;
