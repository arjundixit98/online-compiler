import React, { useState } from "react";
import "./stylesheets/testcase.css";

const TestCase = () => {
  const [activeButton, setActiveButton] = useState("testcase");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div className="testcase">
      <div className="tc-header">
        <button
          onClick={() => {
            handleButtonClick("testcase");
          }}
        >
          Test Case
        </button>
        <button
          className="btn-test-res"
          onClick={() => {
            handleButtonClick("testresult");
          }}
        >
          Test Result
        </button>
      </div>
      {activeButton === "testcase" && <TestCaseView />}
      {activeButton === "testresult" && <TestResultView />}
    </div>
  );
};

const TestCaseView = () => {
  return (
    <div className="tc-main">
      <div>Case 1 </div>
      <div className="inp1">
        x = <input type="text" value={1} />
      </div>
      <div className="inp2">
        y = <input type="text" value={2} />
      </div>
    </div>
  );
};

const TestResultView = () => {
  return (
    <div className="tr-main">
      <div className="tr-status">
        <div className="ans-status">Wrong Answer</div>
        <div className="runtime">Runtime: 34ms</div>
      </div>

      <div className="tc-name">Case 1</div>

      <div className="inp">
        <p>Input</p>
        x = <input type="text" value={1} />
        <br />
        y = <input type="text" value={2} />
      </div>
      <div className="out">
        <p>Output</p>
        <input type="text" value={2} />
      </div>

      <div className="exp">
        <p>Expected</p>
        <input type="text" value={2} />
      </div>
    </div>
  );
};

export default TestCase;
