const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    public_Id: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;