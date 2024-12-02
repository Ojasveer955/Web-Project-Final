const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('signup');
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            req.session.userId = user._id;
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/login');
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        res.redirect('/register');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;