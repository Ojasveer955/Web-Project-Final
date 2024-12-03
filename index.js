const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bookRoutes = require('./routes/bookRoutes')
const cors = require('cors')
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://dishasatija23cse:aQp4gZnnQis0reNE@book-website.5kb60.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsInsecure=true&appName=Book-Website')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(express.json());

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(cors());

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://dishasatija23cse:aQp4gZnnQis0reNE@book-website.5kb60.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsInsecure=true&appName=Book-Website' 
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Routes
app.use('/', authRoutes);
app.use('/admin', isAuthenticated, adminRoutes); // Ensure admin routes are mounted at '/admin'
app.use('/api/books', bookRoutes)

// Home route
app.get('/', (req, res) => {
    res.render('home', { userId: req.session.userId });
});

// Revert the server port to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
