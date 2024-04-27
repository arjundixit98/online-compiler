const path = require("path");
const fs = require("fs");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const outputsDir = path.join(__dirname, "outputs");
if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir);
}

const executeCode = async (language, filePath) => {
  if (language === "cpp") return executeCpp(filePath);
  if (language === "py") return executePy(filePath);
};

const executePy = async (filePath) => {
  const command = `python3 ${filePath}`;

  const { stdout, stderr } = await exec(command);
  if (stderr) {
    return { status: "error", output: stderr };
  }
  return { status: "success", output: stdout };
};

const executeCpp = async (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outputPath = path.join(outputsDir, `${jobId}.out`);

  const command = `g++ ${filePath} -o ${outputPath} && cd ${outputsDir} && ./${jobId}.out`;

  const { stdout, stderr } = await exec(command);
  if (stderr) {
    return { status: "error", output: stderr };
  }
  return { status: "success", output: stdout };
};

module.exports = { executeCode };
