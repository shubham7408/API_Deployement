const express = require("express");
const router = express.Router();
const { getAllBooks, getBookbyId, createBook, deleteBook, updateBookById } = require("../controllers/Book_Controller.js");

router.get("/get", getAllBooks);
router.get("/getBook/:id", getBookbyId);
router.post("/create", createBook);
router.delete("/delete/:id", deleteBook);
router.put("/update/:id", updateBookById);


module.exports = router;