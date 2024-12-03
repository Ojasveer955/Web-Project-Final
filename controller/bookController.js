const Book = require('../models/Book'); // Adjust path if needed

// Fetch all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
        console.log("Books fetched successfully");
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// Fetch a single book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch book' });
    }
};

const createBook = async (req, res) => {
    try {
        console.log('Request received:', req.body);

        // Validate request body
        const { title, author, category, description } = req.body;
        if (!title || !author || !category || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new book instance
        const book = new Book(req.body);

        // Save the book to the database
        await book.save();
        console.log('Book created successfully:', book);

        // Send success response
        res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
        console.error('Error creating book:', error);

        // Send error response
        res.status(500).json({ error: 'Failed to create book. Please try again later.' });
    }
};


// Update a book by ID
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params._id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
