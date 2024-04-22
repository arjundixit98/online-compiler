const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();

const { generateFile } = require("./generateFile");
const { executeCode } = require("./executeCpp");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("<h1>hello from backend<h1>");
  return res.status(200).json({ msg: "hello world" });
});

app.post("/run", async (req, res) => {
  const { language, code } = req.body;
  if (!language || !code)
    return res.status(400).json({ error: "Code or language is empty" });
  try {
    const filePath = await generateFile(language, code);
    const { status, output } = await executeCode(language, filePath);
    //console.log(output);

    return res.status(200).json({ status, output });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ status: "error", output: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port : ${PORT}`);
});
