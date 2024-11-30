const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Add middleware to parse JSON bodies
app.use(express.json());

// Set up Handlebars for views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set up EJS for footer
app.engine('ejs', require('ejs').__express);

// Define static folder
app.use(express.static('public'));

// Import the bookController
const bookController = require('./controller/bookController');

// Route to render the page
app.get('/', (req, res) => {
  // Render the Handlebars header and content
  res.render('home', {
    layout: 'main', // Use the main layout
    footer: 'footer', // Include footer template
  });
});

// Set up routes for book operations
app.get('/books', bookController.getAllBooks);
app.get('/books/:id', bookController.getBookById);
app.post('/books', bookController.createBook);
app.put('/books/:id', bookController.updateBook);
app.delete('/books/:id', bookController.deleteBook);

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
