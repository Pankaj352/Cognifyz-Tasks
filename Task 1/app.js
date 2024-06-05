const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = process.env.port || 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;
  console.log(`New User: Name=${name}, Email=${email}, Password=${password}`);
  res.send("Registration successfully submitted!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


