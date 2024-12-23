const express = require("express");
const multer = require("multer");
const router = express.Router();
const Book = require("../Models/Books"); // Ensure the Book model is properly imported

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Ensure unique file names
  },
});

const upload = multer({ storage });

// Add a new book with image upload
router.post("/add", upload.single("image"), async (req, res) => {
  const { title, author } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      image: req.file.path, // Save the file path
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
});


router.put("/rate/:id", async (req, res) => {
    const { id } = req.params;
    const { starRating } = req.body;
  
    if (!starRating || starRating < 1 || starRating > 5) {
      return res.status(400).json({ error: "Invalid star rating. Must be between 1 and 5." });
    }
  
    try {
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ error: "Book not found." });
      }
  
      book.starRating = starRating;
      await book.save();
  
      res.status(200).json({ message: "Rating updated successfully.", book });
    } catch (err) {
      console.error("Error updating rating:", err);
      res.status(500).json({ error: "Failed to update rating." });
    }
  });
  
  router.get('/books', async (req, res) => {
    const { search } = req.query; // Search query
    try {
      let books;
      if (search) {
        // If a search query is provided, find books by title
        books = await Book.find({
          title: { $regex: search, $options: 'i' }, // Case-insensitive search
        });
      } else {
        books = await Book.find(); // Fetch all books if no search query
      }
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books" });
    }
  });
  
// Add or update review for a book
router.put("/review/:id", async (req, res) => {
  const { id } = req.params;
  const { reviewtext } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    book.reviewtext = reviewtext; // Add or update the review
    await book.save();

    res.status(200).json({ message: "Review updated successfully.", book });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: "Failed to update review." });
  }
});

// Fetch a specific book
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

router.put("/deletereview/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the book by its ID and remove the review text
    const book = await Book.findByIdAndUpdate(
      id,
      { $unset: { reviewtext: "" } }, // Unsets the reviewText field
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Review deleted successfully", book });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;