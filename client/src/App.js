import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [errorOutput, setErrorOutput] = useState("");
  const [language, setLanguage] = useState("");
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    try {
      const response = await axios.post("http://localhost:8000/run", payload);
      setCodeOutput(response.data.output);
      setErrorOutput("");
    } catch ({ response }) {
      console.log(response);
      if (response) {
        console.log(`Got Axios error : ${response.data.output.stderr}`);
        setErrorOutput(response.data.output.stderr);
        setCodeOutput("");
      } else {
        console.log("Error connecting to server!");
        setCodeOutput("Error connecting to server!");
      }
    }
  };

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>

      <div>
        <label>Select a language : </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select a language...</option>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <textarea
        rows={20}
        cols={75}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {codeOutput.length > 0 ? <h1>Code Output : </h1> : <></>}
      <p>{codeOutput}</p>

      {errorOutput.length > 0 ? <h1>Error Output : </h1> : <></>}
      <p>{errorOutput}</p>
    </div>
  );
}

export default App;
