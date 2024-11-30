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
router.delete('/:id', deleteBook);  // Delete a book by ID


// router.get('/', async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.json(books);
//         console.log("Books fetched successfully");
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });


// //Create a new book
// router.post('/', async (req, res) => {
//     try {
//         const book = new Book(req.body);
//         await book.save();
//         res.status(201).json(book);
//         console.log("Book created successfully");
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });
module.exports = router;