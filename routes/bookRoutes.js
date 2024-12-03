const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controller/bookController'); // Adjust path if needed

// Route definitions
router.get('/', getAllBooks);       // Fetch all books
router.get('/:id', getBookById);    // Fetch a book by ID
router.post('/', createBook);       // Create a new book
router.put('/:id', updateBook);     // Update a book by ID
router.delete('/:_id', deleteBook);  // Delete a book by ID

module.exports = router;