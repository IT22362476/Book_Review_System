import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: null, // File object for uploads
  });

  const [message, setMessage] = useState("");

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Save the selected file
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:8080/book/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message); // Success message
      setFormData({ title: "", author: "", image: null }); // Reset form
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred while adding the book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Author Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author's name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image File Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
            Book Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Add Book
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <p className={`mt-4 text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddBookForm;
