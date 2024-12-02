const express = require('express');
const router = express.Router();

// Dashboard/Books list page
router.get('/viewbooks', (req, res) => {
    res.render('Admin_viewbooks');
});

// Add book page
router.get('/addbook', (req, res) => {
    res.render('Admin_addbook');
});

// Update book page
router.get('/updatebook', (req, res) => {
    res.render('Admin_updatebook');
});

// Delete book page
router.get('/deletebook', (req, res) => {
    res.render('Admin_deletebook');
});

router.get('/', (req, res) => {
    res.render('admin');
});

module.exports = router;