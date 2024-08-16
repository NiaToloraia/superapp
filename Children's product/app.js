document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cards-container');
    const pagination = document.getElementById('pagination');
    const cardsPerPage = 15;
    let currentPage = 1;
    let allCards = [];

    // Fetch cards from JSON file
    async function fetchCards() {
        const response = await fetch('allnutrition.json'); // Path to your JSON file
        const cards = await response.json();
        allCards = cards;
        displayCards(cards, currentPage);
        setupPagination(cards);
    }

    // Display cards for the current page
    function displayCards(cards, page) {
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const cardsToDisplay = cards.slice(start, end);

        cardsContainer.innerHTML = ''; // Clear existing cards
        cardsToDisplay.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <img src="${card.image}" alt="${card.title}" class="card-img">
                <button class="heart" onclick=""><img src="../assets/Shape.svg"/></button>
                <div class="point"> 
                        <img src="../assets/Star 2.svg">
                        <p>${card.rating}</p>
                </div>
                <div class="card-content">
                    <h2>${card.title}</h2>
                    <p class="deskDes">${card.description}</p>
                    <p id="mobile-desc">${card.description}</p>
                    <p class="deskPrice">${card.price} ₾</p>
                    <button id="desk-button">${card.button_text}</button>
                    <button id="mobile-button">                            
                        <img src="../assets/IconAdd.svg">
                        <h3>დამატება</h3>
                    </button>
                </div>
            `;
            cardsContainer.appendChild(cardElement);
        });
    }

    // Setup pagination buttons and numbers
    function setupPagination(cards) {
        const totalPages = Math.ceil(cards.length / cardsPerPage);
        const pageNumbersDiv = document.querySelector('.page-numbers');
        const prevLink = document.querySelector('.prev');
        const nextLink = document.querySelector('.next');
        
        pageNumbersDiv.innerHTML = ''; // Clear previous page numbers

        // Previous button functionality
        prevLink.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayCards(cards, currentPage);
                setupPagination(cards);
            }
        };

        // Next button functionality
        nextLink.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayCards(cards, currentPage);
                setupPagination(cards);
            }
        };

        // Page numbers with dots
        const pageNumbers = getPageNumbers(currentPage, totalPages);
        pageNumbers.forEach(page => {
            if (typeof page === 'number') {
                const pageLink = document.createElement('a');
                pageLink.innerText = page;
                if (page === currentPage) {
                    pageLink.classList.add('active');
                }
                pageLink.onclick = () => {
                    currentPage = page;
                    displayCards(cards, currentPage);
                    setupPagination(cards);
                };
                pageNumbersDiv.appendChild(pageLink);
            } else {
                const dots = document.createElement('span');
                dots.classList.add('dots');
                dots.innerText = '...';
                pageNumbersDiv.appendChild(dots);
            }
        });
    }

    // Get the page numbers to display with dots
    function getPageNumbers(current, total) {
        const delta = 2;
        let range = [];
        let rangeWithDots = [];
        let l;

        // Calculate range
        if (total <= 5) {
            // Show all pages if total pages are 5 or less
            range = Array.from({ length: total }, (_, i) => i + 1);
        } else {
            if (current <= 4) {
                range = [1, 2, 3, 4, 5, total];
            } else if (current > total - 4) {
                range = [1, total - 4, total - 3, total - 2, total - 1, total];
            } else {
                range = [1, current - 1, current, current + 1, total];
            }
        }

        // Generate page numbers with dots
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l > 2) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    fetchCards();
});
