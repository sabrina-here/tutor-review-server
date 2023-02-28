const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("tutor finder server side running");
});

app.listen(port, () => {
  console.log("running ...");
});
