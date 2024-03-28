const express = require("express");

const bodyParser = require("body-parser");

const { connectMongoDb } = require('./connection')
const { logReqRes } = require("./backend/mids/logUserActivity");

const signUpRouter = require("./backend/routes/signup");
const signInRouter = require('./backend/routes/signin')




//connect MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/usersTestDB");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logReqRes('log.txt'))






// Handle 
app.use("/signup", signUpRouter);

app.use("/signin", signInRouter);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});


