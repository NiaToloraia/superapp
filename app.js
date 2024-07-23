document.addEventListener("DOMContentLoaded", () => {
  fetch("cards.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      generateCardsHTML(jsonData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  fetch("./assets/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((cardData) => {
      // const slider = document.getElementById("slider");

      // slider.innerHTML = "";

      cardData.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
             
              <div>
                <img src="${card.photo}" alt="${card.name}" class="card-img" />
                <button class="heart"> <img src="./assets/icons/heart.svg" alt="Favorite"  /></button>
               <div class="point">  
                  <img src="${card.stars}" />
                  <p>${card.starNumber}</p>
                </div>
                </div>
             
                <div class="card-content">
                <h3>${card.name}</h3>
                <p>${card.category}</p>
                <div class="card-prices">
                  <span class="end-price">${card.endPrice}</span>
                  ${
                    card.startPrice
                      ? `<span class="start-price">${card.startPrice}</span>`
                      : ""
                  }
                  ${
                    card.discount
                      ? `<span class="discount">${card.discount}</span>`
                      : ""
                  }
                </div>
                <button class="card-link" >კალათაში დამატება</button>
                </div>
            
            `;
        slider.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });

  fetch("./assets/sectionData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((cardData) => {
      const sectionContainer = document.getElementById("sectionContainer");

      sectionContainer.innerHTML = "";

      cardData.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "featured-card";
        cardElement.innerHTML = `
              <div class="card-photo-container">
                <img src="${card.photo}" alt="${card.name}" style="background-color: ${card.backgroundColor}" class="card-photo" />
              </div>
              <div class="card-body" style="background-color: ${card.backgroundColor}" >
                <h3>${card.name}</h3>
                <button class="card-icon">  
                <img src="${card.icon}" alt="Icon"  />
      </button>
              </div>
            `;
        sectionContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
});

function generateCardsHTML(data) {
  let html = "";
  const container = document.getElementById("cards-container");

  data.forEach((item) => {
    html += `
            <div class="card">
                <div>
                <img  class="card-img" src="${item.imageURL}" alt="${item.name}"/>
                <button class="heart" onclick=""><img src="assets/heart.svg"/></button>
                <div class="point"> 
                        <img src="assets/Star 2.svg">
                        <i>5.0</i>
                </div>
                </div>
                <div class="card-content">
                    <h2>${item.name}</h2>
                    <p>${item.desc}</p>
                    <h2>${item.price}</h2>
                    <button class="content-link" onclick="window.open('${item.link}', '_blank')">
                        კალათში დამატება
                    </button>
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
}

//slider
//slider container
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Auto-slide function
function autoSlides() {
  plusSlides(1);
}
