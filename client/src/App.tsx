import React, { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Keyword from "./components/Keyword";
import Ingredients from "./components/Ingredients";
import Dietary from "./components/Dietary";
import Saved from "./components/SavedRecipes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/keyword" element={<Keyword />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/dietary" element={<Dietary />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
