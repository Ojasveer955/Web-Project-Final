
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    cover: { type: String, required: false },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Book', BookSchema);