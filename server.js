const express = require("express");
const path = require("path");
const bookRoutes = require('./routes/bookRoutes');
const connectDB = require("./database/mongodb");
const { engine } = require('express-handlebars'); // For Handlebars
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Connect to MOngoDB
connectDB();

//Set up Handlebars
app.engine('handlebars', engine({
  // defaultLayout: path.join(__dirname, 'views', 'layouts', 'main'),
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// //Set up EJS
// app.set('view engine', 'ejs');
// app.set('ejs views', path.join(__dirname, 'views/ejs')); // EJS views

//Use Book routes
app.use("/api/books", bookRoutes);

// app.get('/header', (req, res) => {
//   res.render('header', {
//     content: 'hnjk'
//   });
// })


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/HomePage.html'));
})

app.get('/Explore.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/Explore.html'));
})

app.get('/Request', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/RequestBook.html'));
})

app.get('/Contact', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/Contact.html'));
})

app.get('/About', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/About.html'));
})

app.get('/admin', (req,res) => {
  res.sendFile(path.join(__dirname + '/public/admin.html'));
})

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

