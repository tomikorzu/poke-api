const PokemonCard = ({ name, img, types }) => {
  const cardsContainer = document.querySelector(".cards-container");
  const card = document.createElement("div");
  card.classList.add("div-center");
  card.classList.add("pokemon-card");
  card.innerHTML = `<img src="${img}" alt="${name} image" class="card-img" />
        <div class="name-type div-center">
          <h3 class="card-name">${name}</h3>

        </div>`;
  setCardTypeColor();
  cardsContainer.appendChild(card);
  const nameTypeContainer = card.querySelector(".name-type");
  types.map((type) => {
    const typeElement = document.createElement("p");
    typeElement.classList.add("card-type");
    typeElement.textContent = type;
    nameTypeContainer.appendChild(typeElement);
  });
};

const setCardTypeColor = () => {
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
};

export default PokemonCard;
