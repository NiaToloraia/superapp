// Get references to all buttons
const myOrdersBtn = document.getElementById("my-orders");
const myCardsBtn = document.getElementById("my-cards");
const myMessagesBtn = document.getElementById("my-messages");
const myAddressesBtn = document.getElementById("my-address");
const mySettingsBtn = document.getElementById("my-settings");
const mainContent = document.getElementById("main-content");

// Function to clear the content in the main area
function clearMainContent() {
  mainContent.innerHTML = "";
}

function setActiveButton(activeButton) {
  const allButtons = [
    myOrdersBtn,
    myCardsBtn,
    myMessagesBtn,
    myAddressesBtn,
    mySettingsBtn,
  ];
  allButtons.forEach((button) => {
    button.style.fontWeight = "normal";
  });
  activeButton.style.fontWeight = "bold";
}

myOrdersBtn.addEventListener("click", () => {
  setActiveButton(myOrdersBtn);
  clearMainContent();

  const orderInfo = `
        <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
           <div class="order-info">
        <div class="order-info-content">
            <p>შეკვეთა: 46199</p>
            <p>თარიღი: 22/09/2024 14:45</p>
            <p>სტატუსი: მიტანილია</p>
            </div>
           <div class="order-info-button">
            <a class="details-btn">დეტალურად</a>
            <img src="../assets/img/icon-chevron-down.svg"  alt="arrow">
            </div>
        </div>
        <div class="card-container">
            <!-- Placeholder for dynamic cards -->
        </div>
          <div class="pages">
            <img src="../assets/img/_.svg"  alt="left-arrow">
             <p class="clicked">1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>...</p>
            <p>15</p>
             <img src="../assets/img/_ (1).svg"  alt="right-arrow">
        </div>
    
    `;
  mainContent.innerHTML = orderInfo;
});

// Event Listener for 'ჩემი ბარათები'
myCardsBtn.addEventListener("click", () => {
  setActiveButton(myCardsBtn);
  clearMainContent();

  const addCardButton = `<button class="add-card-btn">Add Card</button>`;
  const cardImages = `
        <div class="cards">
            <img src="../assets/img/card1.png" alt="Card 1">
            <img src="../assets/img/card2.png" alt="Card 2">
            <img src="../assets/img/card3.png" alt="Card 3">
        </div>
    `;
  mainContent.innerHTML = addCardButton + cardImages;
});

// Event Listener for 'შეტყობინებები'
myMessagesBtn.addEventListener("click", () => {
  setActiveButton(myMessagesBtn);
  clearMainContent();

  const noMessages = `<p>შეტყობინებები არ არის</p>`;
  mainContent.innerHTML = noMessages;
});

// Event Listener for 'პარამეტრები'
mySettingsBtn.addEventListener("click", () => {
  setActiveButton(mySettingsBtn);
  clearMainContent();

  const settingsForm = `
        <div class="settings-form">
            <label>Upload Photo:</label>
            <input type="file" id="upload-photo"><br>
            <label>Email:</label>
            <input type="email" id="email-input"><br>
            <label>Name:</label>
            <input type="text" id="name-input"><br>
            <label>Last Name:</label>
            <input type="text" id="lastname-input"><br>
            <label>Mobile Phone:</label>
            <input type="tel" id="mobile-phone-input"><br>
            <button class="save-btn">Save</button>
        </div>
    `;
  mainContent.innerHTML = settingsForm;
});

// Event Listener for 'მისამართები'
myAddressesBtn.addEventListener("click", () => {
  setActiveButton(myAddressesBtn);
  clearMainContent();

  const addAddressButton = `<button class="add-address-btn">Add Address</button>`;
  const addressForm = `
        <div class="address-form">
            <input type="text" id="address-input" placeholder="Enter address">
            <button class="save-address-btn">Save</button>
        </div>
        <div class="address-list">
            <!-- Placeholder for dynamic addresses -->
        </div>
    `;
  mainContent.innerHTML = addAddressButton + addressForm;
});
