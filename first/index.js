const express = require("express");

const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const {createServer} = require('http')

const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./backend/mids/logUserActivity");

const signUpRouter = require("./backend/routes/signup");
const signInRouter = require("./backend/routes/signin");
const uniqueCodeRouter = require("./backend/routes/unique");
const connectionRouter = require("./backend/routes/r_connection");
const suggestionRouter = require('./backend/routes/r_suggestions')
const chattingRouter = require('./backend/routes/r_message')

const app = express();
const server = createServer(app)
const io = new Server(server)

//connect MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/usersTestDB");

//in-built middlewares:
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//our middlewares
app.use(logReqRes("log.txt")); //Logs each user's activity in log.txt file

//Handle Routes
app.use("/signup", signUpRouter);
app.use("/signin", signInRouter);
app.use("/unique", uniqueCodeRouter);
app.use("/connections", connectionRouter);
app.use('/suggestions', suggestionRouter)


const customIdToSocketIdMap = new Map();

io.on('connection', (socket) => {
  console.log('A client connected with ID:', socket.id);

  // Save custom ID to socket ID mapping
  socket.on('setCustomId', (customId) => {
    customIdToSocketIdMap.set(customId, socket.id);
    console.log(`Mapped custom ID "${customId}" to socket ID "${socket.id}"`);
    console.log(customIdToSocketIdMap)
  });

  socket.on('sendMessage',({fromUser,toUser,message})=>{
    
    const toUserId = customIdToSocketIdMap.get(toUser)
    console.log('line54',toUserId)
    socket.to(toUserId).emit('message',message)
  })

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A client disconnected');
    // Remove mapping if client disconnects
    customIdToSocketIdMap.forEach((value, key) => {
      if (value === socket.id) {
        customIdToSocketIdMap.delete(key);
        console.log(`Removed mapping for custom ID "${key}"`);
      }
    });
  });
});


server.listen(3002, () => {
  console.log("Server is running on port 3002");
});
