import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetBooks = () => {
  const [books, setBooks] = useState([]);
  const [rating, setRating] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Handle rating selection
  const handleRating = (bookId, stars) => {
    const confirmRating = window.confirm(
      `Are you sure you want to rate this book ${stars} stars?`
    );
    if (confirmRating) {
      setRating((prev) => ({ ...prev, [bookId]: stars }));
      // Update the rating in the backend
      axios
        .put(`http://localhost:8080/book/rate/${bookId}`, {
          starRating: stars,
        })
        .then(() => {
          alert("Rating submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting rating:", error);
        });
    }
  };

  // Navigate to Review or Update Review page
  const handleReview = (bookId, hasReview) => {
    if (hasReview) {
      navigate(`/updatereview/${bookId}`);
    } else {
      navigate(`/reviewbook/${bookId}`);
    }
  };

  const handleAddBooks = () => {
    navigate("/AddBookForm"); // Navigates to the homepage
  };

  // Handle Delete Review
  const handleDeleteReview = (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your review?"
    );
    if (confirmDelete) {
      axios
        .put(`http://localhost:8080/book/deletereview/${bookId}`)
        .then(() => {
          alert("Review deleted successfully!");
          // Refresh the books data after deleting the review
          setBooks((prevBooks) =>
            prevBooks.map((book) =>
              book._id === bookId ? { ...book, reviewtext: null } : book
            )
          );
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 font-poppins">
        Book List
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by book name..."
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add Books Button Container */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddBooks}
          className="px-6 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Add Books
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 ">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="flex items-center bg-white shadow-md rounded-lg p-4 bg-gray-200"
          >
            {/* Book Image */}
            <img
              src={`http://localhost:8080/${book.image}`}
              alt={book.title}
              className="w-24 h-32 object-cover rounded-md mr-6"
            />
            {/* Book Details */}
            <div className="flex-1 flex flex-col justify-between">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-700">by {book.author}</p>

              {/* Star Rating */}
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(book._id, star)}
                    className={`text-xl ${
                      star <= (rating[book._id] || book.starRating || 0)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Review or Update Review Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleReview(book._id, !!book.reviewtext)}
                  className={`mt-4 px-4 py-2 rounded-md text-white hover:bg-opacity-80 ${
                    book.reviewtext
                      ? "bg-gray-500 hover:bg-gray-400" // Light green for update review
                      : "bg-blue-500 hover:bg-blue-600" // Blue for review book
                  }`}
                >
                  {book.reviewtext ? "Update Review" : "Review Book"}
                </button>

                {/* Delete Review Button */}
                {book.reviewtext && (
                  <button
                    onClick={() => handleDeleteReview(book._id)}
                    className="mt-4 px-4 py-2 ml-4 rounded-md text-white bg-red-500 hover:bg-red-600"
                  >
                    Delete Review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetBooks;
