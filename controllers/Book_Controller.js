const BookModel = require("../models/Book_Schema.js");


async function getAllBooks(req, res) {
    try {
        const books = await BookModel.find({});
        res.status(200)
            .json({ success: true, books: books });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: error.message });
    }
}

async function getBookbyId(req, res) {
    try {
        const BookId = req.params.id;
        const book = await BookModel.findById(BookId);
        if (!book) {
            return res.status(404)
                .json({ success: false, message: "Book not Found" });
        }
        res.status(200)
            .json({ success: true, book: book });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: error.message });
    }
}

async function createBook(req, res) {
    try {
        const Book = await BookModel.create(req.body);
        res.status(201)
            .json({ success: true, data: Book });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: error.message });
    }
}

async function deleteBook(req, res) {
    try {
        const BookId = req.params.id;
        const book = await BookModel.findByIdAndDelete(BookId);
        if (!book) {
            return res.status(404)
                .json({ success: false, message: "Book not Found" });
        }
        res.status(200)
            .json({ success: true, message: "Book Deleted SuccessFully" });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: erorr.message });
    }
}

async function updateBookById(req, res) {
    try {
        const BookId = req.params.id;
        const updatedBook = await BookModel.findByIdAndUpdate(BookId, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200)
            .json({ success: true, message: "Book Updated SuccessFully", book: updatedBook });
    } catch (error) {
        console.erorr(error);
        return res.status(500)
            .json({ success: false, message: error.message });
    }
}

module.exports = {
    getAllBooks,
    getBookbyId,
    createBook,
    deleteBook,
    updateBookById
};