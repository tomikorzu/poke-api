const PokemonCard = ({ name, img, types }) => {
  const cardsContainer = document.querySelector(".cards-container");
  const card = document.createElement("div");
  card.classList.add("div-center");
  card.classList.add("pokemon-card");
  card.innerHTML = `<img src="${img}" alt="${name} image" class="card-img" />
        <div class="name-type div-center">
          <h3 class="card-name">${name}</h3>
        </div>`;
  
  cardsContainer.appendChild(card);
  
  const nameTypeContainer = card.querySelector(".name-type");
  types.map((type) => addTypes(type, nameTypeContainer));

  setCardTypeColor(card);
};

const addTypes = (type, nameTypeContainer) => {
  const typeElement = document.createElement("p");
    typeElement.classList.add("card-type");
    typeElement.textContent = type;
    nameTypeContainer.appendChild(typeElement);
}

const setCardTypeColor = (card) => {
  const typeElement = card.querySelectorAll(".card-type");
  typeElement.forEach((element) => {
    if (element) {
      switch (element.textContent) {
        case "fire":
          element.style.color = "#f52f2f";
          break;
        case "water":
          element.style.color = "#2f71f5";
          break;
        case "grass":
          element.style.color = "#26ea26";
          break;
        case "bug":
          element.style.color = "#ecb30c";
          break;
        case "normal":
          element.style.color = "#A8A77A";
          break;
        case "electric":
          element.style.color = "#F7D02C";
          break;
        case "ice":
          element.style.color = "#96D9D6";
          break;
        case "fighting":
          element.style.color = "#C22E28";
          break;
        case "poison":
          element.style.color = "#A33EA1";
          break;
        case "ground":
          element.style.color = "#E2BF65";
          break;
        case "flying":
          element.style.color = "#A98FF3";
          break;
        case "psychic":
          element.style.color = "#F95587";
          break;
        case "rock":
          element.style.color = "#B6A136";
          break;
        case "ghost":
          element.style.color = "#735797";
          break;
        case "dragon":
          element.style.color = "#6F35FC";
          break;
        case "dark":
          element.style.color = "#705746";
          break;
        case "steel":
          element.style.color = "#B7B7CE";
          break;
        case "fairy":
          element.style.color = "#D685AD";
          break;
      }
    }
  });
};

export default PokemonCard;
