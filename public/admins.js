// Simulating a book list in memory
let bookStock = [];

// Handle form submission to add a new book
document.getElementById('bookForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const cover = document.getElementById('cover').files[0];
    const description = document.getElementById('description').value;

    // Create book object
    const book = {
        title,
        author,
        category,
        price,
        cover,
        description
    };

    // Add book to stock
    bookStock.push(book);

    // Reset the form
    document.getElementById('bookForm').reset();

    // Update the book list on the page
    updateBookList();
});

// Function to update the displayed book list
function updateBookList() {
    const bookListElement = document.getElementById('bookList');
    bookListElement.innerHTML = '';

    bookStock.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${URL.createObjectURL(book.cover)}" alt="Cover Image">
            <span>${book.title} by ${book.author} - ${book.category}</span>
            <span>Price: $${book.price}</span>
            <p>${book.description}</p>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        `;

        bookListElement.appendChild(li);
    });
}

// Function to delete a book from the stock
function deleteBook(index) {
    // Remove book from the stock array
    bookStock.splice(index, 1);

    // Update the book list after deletion
    updateBookList();
}

// Function to edit a book
function editBook(index) {
    // Get the book data
    const book = bookStock[index];

    // Fill the form with current book data for editing
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('category').value = book.category;
    document.getElementById('price').value = book.price;
    document.getElementById('description').value = book.description;

    // Handle the update of the book on submit
    document.getElementById('bookForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Update the book with the new form values
        const updatedBook = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            category: document.getElementById('category').value,
            price: document.getElementById('price').value,
            cover: document.getElementById('cover').files[0], // This will handle the new cover image as well
            description: document.getElementById('description').value
        };

        // Replace the old book data with the updated data
        bookStock[index] = updatedBook;

        // Reset the form and update the list
        document.getElementById('bookForm').reset();
        updateBookList();
    });
}

// Initial call to update the book list on page load (if any)
updateBookList();
