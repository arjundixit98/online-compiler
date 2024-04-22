const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes);
}

const generateFile = async (language, code) => {
  const jobId = uuid();
  const fileName = `${jobId}.${language}`;
  const filePath = path.join(dirCodes, fileName);
  await fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return filePath;
};

module.exports = { generateFile };
