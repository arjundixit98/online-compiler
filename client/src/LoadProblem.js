import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./stylesheets/loadproblem.css";
import Editor from "./Editor";
import TestCase from "./TestCase";
const LoadProblem = () => {
  const [problem, setProblem] = useState(null);
  const { id: problemId } = useParams();
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/problems/get-problem`,
          { params: { id: problemId } }
        );
        console.log(data);
        setProblem(data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchProblem();
  }, []);

  return (
    <div className="load-problem-page">
      {/* <h1>Current Problem</h1>
      {problem ? (
        <div>
          Id : {problem._id}
          <br />
          Name : {problem.name}
          <br />
          Desciption : {problem.description}
          <br />
          Inputs : {problem.inputs}
          <br />
          Expected Outputs : {problem.expectedOutputs}
        </div>
      ) : (
        <h2>Loading..</h2>
      )} */}

      <main>
        <div className="problem-section">
          {problem ? (
            <div>
              <p className="problem-title">
                {problem.problemNumber} : {problem.name}
              </p>
              <p className="problem-desc">{problem.description}</p>
              <div className="input">
                <p className="problem-inp">Input:</p>
                <p className="example">{problem.inputs}</p>
              </div>
              <div className="output">
                <p className="problem-out">Output:</p>
                <p className="example">{problem.expectedOutputs}</p>
              </div>
            </div>
          ) : (
            <h2>Loading..</h2>
          )}
        </div>
        <div className="right-container">
          <Editor />
          <TestCase />
        </div>
      </main>
      <footer>Footer</footer>
    </div>
  );
};
export default LoadProblem;
