const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    Author:{
        type: String,
        required: true,
        trim: true,
    },
    ISBN:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    Genre:{
        type: String,
        required: true,
        trim: true,
    },
},{timestamps: true});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;