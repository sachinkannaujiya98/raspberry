// const http = require("http");

// http
//   .createServer((req, res) => {
//     console.log(req.url);
//     res.end("h");
//   })
//   .listen("5555");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Raspberry = require("../model/raspberry.js");
const cors = require("cors");
const app = express();
const port = 5555;

// connection;
mongoose.set("strictQuery", false);
const DB =
  "mongodb+srv://sachin:sachin@cluster0.rp9nj2j.mongodb.net/raspberry?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfully");
  })
  .catch((error) => console.log(`no connection`, error));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   console.log(req.url);
//   res.send("h");
// });
app.get("/", async (req, res) => {
  //   _id = req.params.id;
  const raspberry = await Raspberry.find();
  return res.status(200).json(raspberry);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const raspberry = await Raspberry.create({
    ip: req.body.ip,
    name: req.body.name,
  });
  res.status(201).json({
    success: "User Registered successfully",
    data: {
      raspberry,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
