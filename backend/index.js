const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();
const mongoose = require("mongoose");
const MONGOURI = "mongodb://127.0.0.1:27017/online-compiler";
const { generateFile } = require("./generateFile");
const { executeCode } = require("./executeCode");
const Job = require("./models/job");

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("<h1>hello from backend<h1>");
  return res.status(200).json({ msg: "hello world" });
});

app.get("/status", async (req, res) => {
  const jobId = req.query.id;
  console.log('status requested for', jobId);


  if (jobId == undefined) {
    return res.status(400).json({ success: false, error: "missing id query param" });
  }

  try {
    const job = await Job.findById(jobId);
    if (job == undefined) {
      return res.status(404).json({ success: false, error: "invalid job id" });
    }
    return res.status(200).json({ success: true, job });
  }
  catch (err) {
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});
app.post("/run", async (req, res) => {
  const { language, code } = req.body;
  if (!language || !code)
    return res.status(400).json({ error: "Code or language is empty" });

  let job;
  try {
    //need to generate a c++ file with contents from the request
    const filePath = await generateFile(language, code);
    job = await Job.create({ language, filePath });
    const jobId = job["_id"];
    console.log(job);

    res.status(201).json({ success: true, jobId });

    //we need to run the file and send the response
    job["startedAt"] = new Date();
    const { status, output } = await executeCode(language, filePath);
    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    await job.save();
    console.log(job);

    // return res.status(200).json({ status, output });
  } catch (error) {
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(error);
    await job.save();
    console.log(job);
    //return res.status(500).json({ status: "error", output: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port : ${PORT}`);
});
