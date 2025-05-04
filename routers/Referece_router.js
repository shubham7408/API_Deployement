const express = require("express");
const { createAuthor, createBook, getAllBooksWithAuthors } = require("../controllers/Book2_Controller.js");
const router = express.Router();

router.post("/createAuthor", createAuthor);
router.post("/createBook", createBook);
router.get("/getAllBooksWithAuthors/:id", getAllBooksWithAuthors);


module.exports = router;