const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    }
});


const Book2 = mongoose.model("Book2", BookSchema);
module.exports = Book2;