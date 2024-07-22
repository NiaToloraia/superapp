document.addEventListener('DOMContentLoaded', () => {
    fetch('cards.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            generateCardsHTML(jsonData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function generateCardsHTML(data) {
    let html = '';
    const container = document.getElementById('cards-container');

    data.forEach(item => {
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
  showSlides(slideIndex += n);
}

// image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


// Auto-slide function
function autoSlides() {
    plusSlides(1);
  }
  








