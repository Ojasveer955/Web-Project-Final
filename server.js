const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const path = require("path");
const Book = require("./models/Book");
const bookRoutes = require('./routes/bookRoutes');
const connectDB = require("./database/mongodb");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connect to MOngoDB
connectDB();

//Use Book routes
app.use("/api/books", bookRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/HomePage.html'));
})

// app.get('/Explore.html', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/Explore.html'));
// })

// app.get('/Request', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/RequestBook.html'));
// })

// app.get('/Contact', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/Contact.html'));
// })

// app.get('/About', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/About.html'));
// })


// Start the server

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

