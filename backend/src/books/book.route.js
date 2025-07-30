const express = require('express');
const router = express.Router();
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');

// Create a new book
router.post("/create-book", postABook);

// Get all books
router.get("/",getAllBooks);

//update a book endpoint
router.put("/edit/:id", UpdateBook);

//single book endpoint
router.get("/:id", getSingleBook);

//delete a book
router.delete("/:id", deleteABook);
  
module.exports = router;