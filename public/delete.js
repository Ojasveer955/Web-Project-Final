document.getElementById('deleteBtn').addEventListener('click', function() {
    let bookID = document.getElementById('deleteBookID').value;
    
    if (localStorage.getItem(bookID)) {
        localStorage.removeItem(bookID);
        alert('Book deleted successfully!');
    } else {
        alert('No book found with the provided ID.');
    }
});
