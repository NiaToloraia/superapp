const cards2Data = () => {

  return fetch("cards2.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  cards2Data().then((jsonData) => {
    generateCards2HTML(jsonData);
  });
});

function generateCards2HTML(data) {
  let html = "";
  const container = document.getElementById("cards2-container");

  data.forEach((item) => {
    html += `

    return fetch('cards2.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    cards2Data().then(jsonData => {
        generateCards2HTML(jsonData);
    });
    faqAnswer();
    burgerMenu();
 
});

function generateCards2HTML(data) {
    let html = '';
    const container = document.getElementById('cards2-container');

    data.forEach(item => {
        html += `

            <div class="card2">
                <img src="assets/img/Icon Button.svg" alt="arrowOne" class="arrowOne" id="arrowOne">
                <img src="${item.imageURL}" alt="${item.name}" class="cardIMg">
                <img src="assets/img/Frame 92.svg" alt="arrowW" class="arrowW" id="arrowW">
                <div class="card2-content">
                    <h4 class="allHomeName">${item.name}</h4>
                    <p class="titleDesk">${item.desc}</p>
                    <span class="priceText">${item.price}</span>&nbsp;
                    <span class="allHomeStartPr">${item.startPrice}</span>&nbsp;
                   ${

                     item.discount
                       ? `<span class="allHomeDisc">${item.discount}</span>`
                       : ""
                   }

                    item.discount
                      ? `<span class="allHomeDisc">${item.discount}</span>`
                      : ""
                  }

                    <br/>
                    <button type="button"  class="cartButton">კალათაში დამატება</button">
                    <button type="button"  class="mobButton"><img src="assets/img/Icon Left Wrapper.svg" alt="butt">&nbsp;&nbsp;&nbsp;დამატება</button">
                </div>
            </div>
        `;

  });

  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;

      // Toggle the display of the accordion content
      if (content.style.display === "block") {
        content.style.display = "none";
        // this.querySelector('.footerIconMob').style.transform = 'rotate(0deg)';
      } else {
        content.style.display = "block";
        // this.querySelector('.footerIconMob').style.transform = 'rotate(180deg)';
      }
    });
  });
});

    });

    container.innerHTML = html;
}





