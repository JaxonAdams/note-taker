const path = require('path');
const express = require('express');
const router = require('express').Router();

// use css and js files in /public
router.use(express.static('public'));

// serve landing page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// serve notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

module.exports = router;