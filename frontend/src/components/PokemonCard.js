const PokemonCard = ({ name, img, types }) => {
  const cardsContainer = document.querySelector(".cards-container");
  const card = document.createElement("div");
  card.classList.add("div-center");
  card.classList.add("pokemon-card");
  card.innerHTML = `<img src="${img}" alt="${name} image" class="card-img" />
        <div class="name-type div-center">
          <h3 class="card-name">${name}</h3>
          <ul class="type-list"></ul>
        </div>`;

  cardsContainer.appendChild(card);

  const typeList = card.querySelector(".type-list");
  types.map((type) => addTypes(type, typeList));

  setCardTypeColor(card);
};

const addTypes = (type, typeList) => {
  const typeElement = document.createElement("p");
  typeElement.classList.add("card-type");
  typeElement.textContent = type;
  typeList.appendChild(typeElement);
};

const setCardTypeColor = (card) => {
  const typeElement = card.querySelectorAll(".card-type");
  typeElement.forEach((element) => {
    if (element) {
      switch (element.textContent) {
        case "fire":
          element.style.backgroundColor = "#d9534f"; // Rojo fuego
          break;
        case "water":
          element.style.backgroundColor = "#4682b4"; // Azul agua
          break;
        case "grass":
          element.style.backgroundColor = "#32cd32"; // Verde hierba
          break;
        case "bug":
          element.style.backgroundColor = "#b8860b"; // Marrón insecto
          break;
        case "normal":
          element.style.backgroundColor = "#8b8b7a"; // Marrón normal
          break;
        case "electric":
          element.style.backgroundColor = "#e1ad01"; // Amarillo eléctrico
          break;
        case "ice":
          element.style.backgroundColor = "#70a6d2"; // Azul hielo
          break;
        case "fighting":
          element.style.backgroundColor = "#a52a2a"; // Rojo pelea
          break;
        case "poison":
          element.style.backgroundColor = "#8b008b"; // Púrpura veneno
          break;
        case "ground":
          element.style.backgroundColor = "#d2691e"; // Marrón tierra
          break;
        case "flying":
          element.style.backgroundColor = "#7b68ee"; // Púrpura volador
          break;
        case "psychic":
          element.style.backgroundColor = "#db7093"; // Rosa psíquico
          break;
        case "rock":
          element.style.backgroundColor = "#cd853f"; // Marrón roca
          break;
        case "ghost":
          element.style.backgroundColor = "#6a5acd"; // Morado fantasma
          break;
        case "dragon":
          element.style.backgroundColor = "#7f00ff"; // Púrpura dragón
          break;
        case "dark":
          element.style.backgroundColor = "#4f4f4f"; // Gris oscuro
          break;
        case "steel":
          element.style.backgroundColor = "#7d858c"; // Gris acero
          break;
        case "fairy":
          element.style.backgroundColor = "#c58d85"; // Rosa hada
          break;
      }
    }
  });
};

export default PokemonCard;
