import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddProblem from "./AddProblem";
import ViewProblems from "./ViewProblems";
import LoadProblem from "./LoadProblem";
import "./stylesheets/home.css";

function Home() {
  return (
    <Router>
      <div className="nav-bar">
        <Link className="nav-links">Home</Link>
        <Link className="nav-links" to={"/"}>
          View Problems
        </Link>
        <Link className="nav-links" to={"/problems"}>
          Add problem
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<ViewProblems />} />
        <Route path="/load-problem/:id" element={<LoadProblem />} />
        <Route path="/problems" element={<AddProblem />} />
      </Routes>
    </Router>
  );
}

export default Home;
