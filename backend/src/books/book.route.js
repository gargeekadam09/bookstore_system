const express = require('express');
const router = express.Router();
const { postABook } = require('./book.controller');

// Create a new book
router.post("/create-book", postABook);

// Get all books
// TODO: Add getAllBooks route

module.exports = router;