import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [errorOutput, setErrorOutput] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState();
  const [jobId, setJobID] = useState();
  const handleSubmit = async () => {

    const payload = {
      language,
      code,
    };
    try {
      setCodeOutput("");
      setErrorOutput("");
      setStatus("");
      setJobID("");

      const { data } = await axios.post("http://localhost:8000/run", payload);
      console.log(data);
      const jobId = data.jobId;
      setJobID(jobId);

      let intervalId;
      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get("http://localhost:8000/status", { params: { id: jobId } });

        const { job, success, error } = dataRes;
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          console.log(jobStatus, jobOutput);
          if (jobStatus === 'pending')
            return;

          else if (jobStatus === 'error') {
            setErrorOutput(jobOutput);
          }
          else {
            setCodeOutput(jobOutput);
          }
          clearInterval(intervalId);
        }
        else {
          setStatus("Error: Please retry!");
          console.log(error);
          setErrorOutput(error);
          clearInterval(intervalId);
        }
      }, 1000);




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
      <p>{status}</p>
      <p>{jobId && `JobID : ${jobId}`}</p>
      {codeOutput.length > 0 ? <h1>Code Output : </h1> : <></>}
      <p>{codeOutput}</p>

      {errorOutput.length > 0 ? <h1>Error Output : </h1> : <></>}
      <p>{errorOutput}</p>
    </div>
  );
}

export default App;
