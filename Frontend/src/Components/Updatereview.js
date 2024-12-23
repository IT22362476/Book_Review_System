import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateReview = () => {
  const { bookId } = useParams();
  const [review, setReview] = useState("");
  const [dateModified, setDateModified] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/book/${bookId}`);
        setReview(response.data.reviewtext || "");
        setDateModified(response.data.dateadded);  // Assuming `dateModified` is part of the response
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchReview();
  }, [bookId]);

  // Function to format the date to 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateReview = async () => {
    try {
      await axios.put(`http://localhost:8080/book/review/${bookId}`, { reviewtext: review });
      alert("Review updated successfully!");
      navigate("/Getbooks");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Update Review</h1>
      
      {/* Displaying the Last Modified Date */}
      {dateModified && (
        <p className="text-center text-lg text-gray-600">
          Last Modified: {formatDate(dateModified)}
        </p>
      )}

      <div className="max-w-lg mx-auto">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Update your review..."
          className="w-full p-4 border rounded-lg"
          rows="5"
        />
        <button
          onClick={updateReview}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Update Review
        </button>
      </div>
    </div>
  );
};

export default UpdateReview;
