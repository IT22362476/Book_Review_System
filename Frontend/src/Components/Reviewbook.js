import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewBook = () => {
  const { bookId } = useParams();
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const submitReview = async () => {
    
    try {
      await axios.put(`http://localhost:8080/book/review/${bookId}`, { reviewtext: review });
      alert("Review submitted successfully!");
      navigate("/Getbooks");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Review Book</h1>
      <div className="max-w-lg mx-auto">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          className="w-full p-4 border rounded-lg"
          rows="5"
        />
        <button
          onClick={submitReview}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewBook;
