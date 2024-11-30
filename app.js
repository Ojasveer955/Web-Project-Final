const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Set up Handlebars for views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set up EJS for footer
app.engine('ejs', require('ejs').__express);

// Define static folder
app.use(express.static('public'));

// Route to render the page
app.get('/', (req, res) => {
  // Render the Handlebars header and content
  res.render('home', {
    layout: 'main', // Use the main layout
    footer: 'footer', // Include footer template
  });
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
