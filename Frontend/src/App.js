import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import AddBookForm from './Components/Addbooks';
import GetBooks from './Components/Getbooks';
import ReviewBook from './Components/Reviewbook';
import UpdateReview from './Components/Updatereview';
import Welcome from './Components/Welcome';




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/AddBookForm" element={<AddBookForm />} />
      <Route path="/GetBooks" element={<GetBooks />} />
      <Route path="/reviewbook/:bookId" element={<ReviewBook />} />
      <Route path="/updatereview/:bookId" element={<UpdateReview />} />
      </Routes>
    </Router>
  );
}

export default App;
