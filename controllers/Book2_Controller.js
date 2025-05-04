const Author = require("../models/Auther.js");
const Book2 = require("../models/Books.js");

async function createAuthor(req, res) {
    try {
        const author = await Author.create(req.body);
        res.status(201)
            .json({ success: true, message: "Author created successfully", author });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: "Internal server error" });
    }
}


async function createBook(req, res) {
    try {
        const Book = await Book2.create(req.body);
        if (!Book) {
            return res.status(400)
                .json({ success: false, message: "Book creation failed" });
        }
        res.status(201)
            .json({ success: true, message: "Book created successfully", Book });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

async function getAllBooksWithAuthors(req, res) {
    try {
        const bookId = req.params.id;
        const books = await Book2.findById(bookId)
            .populate("author")
        if (!books) {
            return res.status(404)
                .json({ success: false, message: "Book not found" });
        }
        res.status(200)
            .json({ success: true, message: "Books fetched successfully", books });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: "Internal server error" });

    }
}

module.exports = {
    createAuthor,
    createBook,
    getAllBooksWithAuthors
};