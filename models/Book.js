const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    cover: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;