import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProblem() {
  const [problemName, setProblemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [inputs, setInputs] = useState("");
  const [expectedOutputs, setExpectedOutputs] = useState("");
  const [testCasesCount, setTestCasesCount] = useState("");
  const [testCaseInput, setTestCaseInput] = useState("");
  const [testCaseExpectedOutput, setTestCaseExpectedOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      problemName,
      problemDescription,
      inputs,
      expectedOutputs,
      testCasesCount,
      testCaseInput,
      testCaseExpectedOutput,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/problems/add-problem",
        payload
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error received while sending data to server", error);
    }
  };

  return (
    <div>
      <h1>Problem Set</h1>

      <label>
        Problem Name :
        <input
          type="text"
          value={problemName}
          onChange={(e) => setProblemName(e.target.value)}
          placeholder="Problem Name"
        />
      </label>

      <br />

      <label>
        testcases count :
        <input
          type="text"
          value={testCasesCount}
          onChange={(e) => setTestCasesCount(e.target.value)}
          placeholder="Test case count"
        />
      </label>

      <br />
      <label>
        Description :
        <textarea
          rows={20}
          cols={70}
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Problem Description"
        />
      </label>

      <br />

      <label>
        Problem Input :
        <input
          type="text"
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
          placeholder="Problem Inputs"
        />
      </label>
      <br />
      <label>
        Problem Input TestCase:
        <textarea
          rows={10}
          cols={70}
          value={testCaseInput}
          onChange={(e) => setTestCaseInput(e.target.value)}
          placeholder="Problem Inputs"
        />
      </label>

      <br />
      <label>
        Problem expected output :
        <input
          type="text"
          value={expectedOutputs}
          onChange={(e) => setExpectedOutputs(e.target.value)}
          placeholder="Problem Expected Outputs"
        />
      </label>
      <br />
      <label>
        Problem expected output testcase:
        <textarea
          rows={10}
          cols={70}
          value={testCaseExpectedOutput}
          onChange={(e) => setTestCaseExpectedOutput(e.target.value)}
          placeholder="Problem Expected Outputs"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default AddProblem;
