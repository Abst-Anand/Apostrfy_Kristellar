const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { connectMongoDb } = require('./connection')
const { logReqRes } = require("./backend/mids/logUserActivity");
const signUpRouter = require("./backend/routes/signup");

//connect MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/usersTestDB");

const app = express();

app.use(logReqRes('log.txt'))


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Handle POST request
app.use("/signup", signUpRouter);

app.post("/login", async (req, res) => {
  const body = req.body;
  console.log(body.email);
  console.log(body.password);
  console.log(body);
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
