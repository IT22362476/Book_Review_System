import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  // Navigate to '/Getbooks' when Next button is clicked
  const handleNext = () => {
    navigate("/Getbooks");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 via-sky-400 to-cyan-200 flex items-center justify-center">
      <div className="text-center p-8 rounded-lg bg-white shadow-lg max-w-lg">
        <img
          src="/images/Book_Stack.jpg"// Sample Book Image
          alt="Books"
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Book Review System
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Explore, review, and rate your favorite books. Start your literary
          journey now!
        </p>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Welcome;
