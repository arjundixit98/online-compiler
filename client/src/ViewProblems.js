import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewProblems() {
  const [problemList, setProblemList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/problems/get-problems"
        );

        setProblemList(data);
      } catch (error) {
        console.log("Error occured", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Problem List</h1>;
      <ul>
        {problemList.map((problem, index) => (
          <li key={index}>
            <Link to={`/load-problem/${problem._id}`}>{problem.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewProblems;
