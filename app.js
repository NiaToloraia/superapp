document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display product cards
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

  // Fetch and display section data
  fetch("sectionData.json")
    .then((response) => response.json())
    .then((sectionData) => {
      generateSectionHTML(sectionData);
    })
    .catch((error) => console.error("Error fetching section data:", error));

  // Generate HTML for product cards
  function generateCardsHTML(data) {
    let html = "";
    const container = document.getElementById("cards-container");

    data.forEach((item) => {
      html += `
                <div class="card">
                    <div>
                    <img class="card-img" src="${item.imageURL}" alt="${item.name}"/>
                    <button class="heart" onclick=""><img src="assets/Shape.svg"/></button>
                    <div class="point"> 
                            <img src="assets/Star 2.svg">
                            <i>5.0</i>
                    </div>
                    </div>
                    <div class="card-content">
                        <h2>${item.name}</h2>
                        <p>${item.desc}</p>
                        <h2>${item.price}</h2>
                        <button class="content-link  addIn" onclick="window.open('${item.link}', '_blank')">
                            კალათში დამატება
                        </button>
                        <button class="content-link iconLogoIn" onclick="window.open('${item.link}', '_blank')">
                            <img src="assets/IconAdd.svg">
                            <h3>დამატება</h3>
                        </button>
                    </div>
                </div>
            `;
    });

    container.innerHTML = html;
  }

  // Generate HTML for sections
  function generateSectionHTML(data) {
    let html = "";
    const sectionContainer = document.getElementById("section-container");
    data.forEach((item) => {
      html += `
                <div class="section" style="background-color: ${item.backgroundColor};">
                    <img src="${item.photo}" alt="${item.name}" />
                    <h2>${item.name}</h2>
                    <img src="${item.icon}" alt="icon" />
                </div>
            `;
    });
    sectionContainer.innerHTML = html;
  }


  

  // Slider functionality
  let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  // Thumbnail image controls
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

  // Auto slide for mobile
  // setInterval(() => {
  //   if (window.innerWidth <= 768) {
  //     plusSlides(1);
  //   }
  // }, 5000); // Change image every 5 seconds


  //swiper
  // Attach functions to window object for accessibility
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;

  // Swipe functionality
  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // Detect horizontal swipe
      if (xDiff > 0) {
        // Left swipe
        plusSlides(1);
      } else {
        // Right swipe
        plusSlides(-1);
      }
    }
    // Reset values
    xDown = null;
    yDown = null;
  }

  const slider = document.querySelector(".slider-wrapper");
  slider.addEventListener("touchstart", handleTouchStart, false);
  slider.addEventListener("touchmove", handleTouchMove, false);
});
