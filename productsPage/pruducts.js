async function fetchCards() {
  try {
    const response = await fetch("./assets/products.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    createCards(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function createCards(data) {
  const cardContainer = document.getElementById("card-container");

  data.cards.forEach((card) => {
    const cardHTML = `
            <div class="ProductsCard">
                <img src="${card.imageSrc}" alt="${card.imageAlt}">
                <p>${card.text}</p>
            </div>
            
        `;
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

fetchCards();
