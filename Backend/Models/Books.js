const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number
    },
    image: {
        type: String, // URL or Base64 encoded string
        required: true, // Mark it required if every book must have an image
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    reviewtext: {
        type: String,
    },
    dateadded: {
        type: Date,
        default: Date.now, // Automatically set the current date
      },
    starRating: {
        type: Number,
        required: false, // Optional if not every book has a rating initially
        min: 1,          // Minimum allowed rating
        max: 5           // Maximum allowed rating
    }
});

const Book = mongoose.model("Book", userSchema);

module.exports = Book;
