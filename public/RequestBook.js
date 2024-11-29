document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('requestForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting

        // Get field values and elements
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const bookTitleField = document.getElementById('bookTitle');
        const bookAuthorField = document.getElementById('bookAuthor');
        const bookGenreField = document.getElementById('bookGenre');
        const formMessage = document.getElementById('formMessage');

        // Clear any previous messages and remove error classes
        formMessage.textContent = '';
        [nameField, emailField, bookTitleField, bookAuthorField, bookGenreField].forEach(field => field.classList.remove('error'));

        // Regular expressions for validation
        const namePattern = /^[a-zA-Z\s]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const textPattern = /^[a-zA-Z0-9\s,.'-]+$/;

        // Flag to track if form is valid
        let isValid = true;

        // Validation Checks with highlighting
        if (!nameField.value.trim() || !namePattern.test(nameField.value.trim())) {
            formMessage.textContent = 'Please enter a valid name (letters and spaces only).';
            nameField.classList.add('error');
            isValid = false;
        }

        if (!emailField.value.trim() || !emailPattern.test(emailField.value.trim())) {
            formMessage.textContent = 'Please enter a valid email address.';
            emailField.classList.add('error');
            isValid = false;
        }

        if (!bookTitleField.value.trim() || !textPattern.test(bookTitleField.value.trim())) {
            formMessage.textContent = 'Please enter a valid book title.';
            bookTitleField.classList.add('error');
            isValid = false;
        }

        if (bookAuthorField.value.trim() && !namePattern.test(bookAuthorField.value.trim())) {
            formMessage.textContent = 'Please enter a valid author name (letters and spaces only).';
            bookAuthorField.classList.add('error');
            isValid = false;
        }

        if (bookGenreField.value.trim() && !textPattern.test(bookGenreField.value.trim())) {
            formMessage.textContent = 'Please enter a valid genre.';
            bookGenreField.classList.add('error');
            isValid = false;
        }

        // Show pop-up if all validations pass
        if (isValid) {
            showPopup();
            document.getElementById('requestForm').reset(); // Clear the form
        }
    });
});

// Function to display the pop-up
function showPopup() {
    document.getElementById('successPopup').style.display = 'block';
    document.querySelector('.popup-overlay').style.display = 'block';
}

// Function to close the pop-up
function closePopup() {
    document.getElementById('successPopup').style.display = 'none';
    document.querySelector('.popup-overlay').style.display = 'none';
}
