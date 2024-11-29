let books = [];
let filteredBooks = [];
let currentPage = 1;
const itemsPerPage = 8; // Number of items to display per load

// Load books data from JSON and apply category filter if specified in the URL
async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        books = await response.json();

        // Check URL for category parameter
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        // Apply filter based on category or show all if no category is specified
        if (category) {
            filterBooks(category);
        } else {
            filteredBooks = books;
            displayBooks(filteredBooks);
        }
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// Display books in the grid with "Load More" functionality
function displayBooks(booksToDisplay) {
    const bookGrid = document.getElementById('book-grid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = booksToDisplay.slice(startIndex, endIndex);

    // Append new books to the grid without clearing previous ones
    paginatedBooks.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title} cover">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.description}</p>
            <button>Add to Cart</button>
        `;
        bookGrid.appendChild(bookCard);
    });

    if (bookGrid.innerHTML === '' && booksToDisplay.length === 0){
        const requestText = document.createElement('div');
        requestText.className = 'request-text';
        requestText.innerHTML = `
            <h2>Didn't find the book you were looking for?</h2>
            <p>Don't Worry! Request a Book <a href='RequestBook.html'>here</a></p>
            `;
        bookGrid.appendChild(requestText);
    }

    // Show or hide "Load More" button based on available books
    const loadMoreButton = document.getElementById('load-more');
    if (endIndex >= booksToDisplay.length) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
}

// Filter books by category
function filterBooks(category) {
    currentPage = 1; // Reset to the first page for new filters
    document.getElementById('book-grid').innerHTML = ''; // Clear previous results

    // Update active button styling if the category buttons are rendered
    document.querySelectorAll('.category-buttons button').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.category-buttons button[onclick="filterBooks('${category}')"]`);
    if (activeButton) activeButton.classList.add('active');

    // Set filteredBooks based on the selected category
    filteredBooks = category === 'All' ? books : books.filter(book => book.category === category);
    displayBooks(filteredBooks);
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    currentPage = 1; // Reset to the first page for new searches
    document.getElementById('book-grid').innerHTML = ''; // Clear previous results

    const searchTerm = e.target.value.toLowerCase();
    const searchedBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    displayBooks(searchedBooks);
});

// Load more books on button click
document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    displayBooks(filteredBooks);
});

// Initialize page
loadBooks();
