// Sample data for the books (this would usually come from a server or a database)
const booksDatabase = [
    { id: '1', title: 'Book One', author: 'Author A', category: 'Fiction', price: '10', description: 'Description of book one.' },
    { id: '2', title: 'Book Two', author: 'Author B', category: 'Non-Fiction', price: '15', description: 'Description of book two.' },
    // Add more sample books as needed
];

// Event Listener for Search (Load Book Data)
document.getElementById('searchBtn').addEventListener('click', function() {
    const bookId = document.getElementById('bookId').value;
    const book = booksDatabase.find(b => b.id === bookId);

    if (book) {
        // Populate the form with the existing book data
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookCategory').value = book.category;
        document.getElementById('bookPrice').value = book.price;
        document.getElementById('bookDescription').value = book.description;

        // Display the Book Details Section and Enable Editing
        document.getElementById('bookDetails').style.display = 'block';
        document.getElementById('bookTitle').disabled = false;
        document.getElementById('bookAuthor').disabled = false;
        document.getElementById('bookCategory').disabled = false;
        document.getElementById('bookPrice').disabled = false;
        document.getElementById('bookDescription').disabled = false;
        document.getElementById('updateBtn').disabled = false;
    } else {
        alert('Book not found!');
    }
});

// Event Listener for Update (Submit the updated book data)
document.getElementById('updateBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the updated values from the form
    const bookId = document.getElementById('bookId').value;
    const updatedBook = {
        id: bookId,
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        category: document.getElementById('bookCategory').value,
        price: document.getElementById('bookPrice').value,
        cover: document.getElementById('bookCover').files[0], // Optional image
        description: document.getElementById('bookDescription').value,
    };

    // For demonstration purposes, logging the updated book
    console.log('Updated Book:', updatedBook);

    // In a real application, you would send this data to the server here

    alert('Book updated successfully!');
});
