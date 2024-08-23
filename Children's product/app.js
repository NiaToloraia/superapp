document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cards-container');
    const pagination = document.getElementById('pagination');
    const selectedTagsContainer = document.getElementById('selected-tags');
    const clearFiltersBtn = document.getElementById('clear-filters');
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
                <button class="heart"><img src="../assets/Shape.svg"/></button>
                <div class="point"> 
                  <img src="../assets/Star 2.svg">
                    <p>${card.rating}.0 </p>
                  
                </div>
                <div class="card-content">
                    <h2>${card.title}</h2>
                    <p class="deskDes">${card.description}</p>
                    <p id="mobile-desc">${card.description}</p>
                    <p class="deskPrice">${card.price} ₾</p>
                    <div id="mobile-price">
                        <p>36.00 ₾</p>
                        <p>72.00 ₾</p>
                        <p>-50%</p>
                    </div>
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



    // 

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
    
        // Determine how many page numbers to show
        const maxPagesToShow = 4; // Adjust this value to show more/less pages
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
        // Adjust startPage if it's too close to the end
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
    
        // Page numbers with dots
        if (startPage > 1) {
            const firstPageLink = document.createElement('a');
            firstPageLink.innerText = 1;
            firstPageLink.onclick = () => {
                currentPage = 1;
                displayCards(cards, currentPage);
                setupPagination(cards);
            };
            pageNumbersDiv.appendChild(firstPageLink);
    
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.innerText = '...';
                pageNumbersDiv.appendChild(dots);
            }
        }
    
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.innerText = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.onclick = () => {
                currentPage = i;
                displayCards(cards, currentPage);
                setupPagination(cards);
            };
            pageNumbersDiv.appendChild(pageLink);
        }
    
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.innerText = '...';
                pageNumbersDiv.appendChild(dots);
            }
    
            const lastPageLink = document.createElement('a');
            lastPageLink.innerText = totalPages;
            lastPageLink.onclick = () => {
                currentPage = totalPages;
                displayCards(cards, currentPage);
                setupPagination(cards);
            };
            pageNumbersDiv.appendChild(lastPageLink);
        }
    }
    


    // Add tag for a filter or sort criterion
    function addTag(type, value) {
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.setAttribute('data-type', type);
        tag.innerHTML = `
            <span>${value}</span>
            <button onclick="removeTag('${type}')">
                <img src="../assets/icons/closefilter.svg" alt="remove">
            </button>
        `;
        selectedTagsContainer.appendChild(tag);
    }

    // Remove tag and associated filter
    function removeTag(type) {
        document.querySelector(`.tag[data-type="${type}"]`).remove();
        if (type === 'sort') {
            document.querySelector('.dropdown-item.selected').classList.remove('selected');
        } else {
            document.querySelector(`input[data-${type}="${value}"]`).checked = false;
        }
        filterAndSortCards();
    }

    // Clear all tags and filters
    clearFiltersBtn.addEventListener('click', () => {
        selectedTagsContainer.innerHTML = '';
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.dropdown-item.selected').forEach(item => item.classList.remove('selected'));
        filterAndSortCards();
    });

    // Filter and sort function
    function filterAndSortCards() {
        const selectedBrands = Array.from(document.querySelectorAll('input[data-brand]:checked')).map(cb => cb.getAttribute('data-brand'));
        const selectedAges = Array.from(document.querySelectorAll('input[data-age]:checked')).map(cb => cb.getAttribute('data-age'));
        const selectedVolumes = Array.from(document.querySelectorAll('input[data-volume]:checked')).map(cb => cb.getAttribute('data-volume'));
        const selectedRatings = Array.from(document.querySelectorAll('input[data-rating]:checked')).map(cb => cb.getAttribute('data-rating'));
        const sortValue = document.querySelector('.dropdown-item.selected')?.getAttribute('data-value');

        let filteredCards = allCards;

        selectedTagsContainer.innerHTML = ''; // Clear previous tags

        // Filter by brand
        if (selectedBrands.length > 0) {
            selectedBrands.forEach(brand => addTag('brand', brand));
            filteredCards = filteredCards.filter(card => selectedBrands.includes(card.title));
        }

        // Filter by age
        if (selectedAges.length > 0) {
            selectedAges.forEach(age => addTag('age', age));
            filteredCards = filteredCards.filter(card => selectedAges.includes(card.age));
        }

        // Filter by volume
        if (selectedVolumes.length > 0) {
            selectedVolumes.forEach(volume => addTag('volume', volume));
            filteredCards = filteredCards.filter(card => selectedVolumes.some(v => card.description.includes(v)));
        }

        // Filter by rating
        if (selectedRatings.length > 0) {
            selectedRatings.forEach(rating => addTag('rating', `${rating} stars`));
            filteredCards = filteredCards.filter(card => selectedRatings.includes(String(card.rating)));
        }

        // Sort the filtered cards
        if (sortValue) {
            addTag('sort', sortValue);
            filteredCards.sort((a, b) => {
                switch (sortValue) {
                    case 'brand':
                        return a.title.localeCompare(b.title);
                    case 'age':
                        return (a.age || "").localeCompare(b.age || "");
                    case 'volume':
                        return parseInt(a.description.match(/\d+/)) - parseInt(b.description.match(/\d+/));
                    case 'rating':
                        return b.rating - a.rating; // Sort by rating descending
                    default:
                        return 0;
                }
            });
                }

    displayCards(filteredCards, 1);  // Display the filtered cards on the first page
    setupPagination(filteredCards);  // Update pagination for filtered cards
}

// Event listeners for filtering and sorting
document.querySelectorAll('input[data-brand], input[data-age], input[data-volume], input[data-rating]').forEach(checkbox => {
    checkbox.addEventListener('change', filterAndSortCards);
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');
        filterAndSortCards();
    });
});

fetchCards()
});