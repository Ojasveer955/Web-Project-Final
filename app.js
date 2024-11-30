const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Configure Handlebars
app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

// Define static folder
app.use(express.static('public'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
