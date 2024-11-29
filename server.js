const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://dishasatija23cse:aQp4gZnnQis0reNE@book-website.5kb60.mongodb.net/?retryWrites=true&w=majority&appName=Book-Website", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));


// Ye sir se puchna h kis isme kar skte h ya nahi schema and model bhi

// Schema and Model
const BookSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  cover: { type: String, required: true },
  description: { type: String, required: true },
});

const Book = mongoose.model("Book", BookSchema);

// CRUD Routes

// Create (Add a book)
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Error adding book", error });
  }
});

// Read (Get all books)
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
});

// Read (Get a specific book by id)
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error });
  }
});

// Update (Edit a book)
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error });
  }
});

// Delete (Remove a book)
app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ id: req.params.id });
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

