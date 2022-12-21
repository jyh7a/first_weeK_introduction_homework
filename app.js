const express = require("express");
const connect = require("./schemas");

// create app
const app = express();

// env setting
require("dotenv").config();

// db connect
connect();

// middleware
// use body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.status(400).send("안녕하세요~");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("Server don start for port: " + PORT));
