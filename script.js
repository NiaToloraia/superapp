document.addEventListener("DOMContentLoaded", () => {
  cards2Data().then((jsonData) => {
    generateCards2HTML(jsonData);
  });
  faqAnswer();
  burgerMenu();
});

function generateCards2HTML(data) {
  let html = "";
  const container = document.getElementById("cards2-container");

  data.forEach((item) => {
    html += `
            <div class="card2">
                <img src="assets/img/Icon Button.svg" alt="arrowOne" class="arrowOne" id="arrowOne">
                <img src="${item.imageURL}" alt="${item.name}" class="cardIMg">
                <img src="assets/img/Frame 92.svg" alt="arrowW" class="arrowW" id="arrowW">
                <div class="card2-content">
                    <h4>${item.name}</h4>
                    <p class="titleDesk">${item.desc}</p>
                    <span class="priceText">${item.price}</span>
                    <span class="allHomeStartPr">${item.startPrice}</span>&nbsp;
                   ${
                     item.discount
                       ? `<span class="allHomeDisc">${item.discount}</span>`
                       : ""
                   }
                    <br/>
                    <button type="button"  class="cartButton">კალათაში დამატება</button">
               
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
}
