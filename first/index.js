const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

//http://192.168.233.220:3000/register

// Parse JSON bodies
//app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());

// const username = 'iamsatyanarayanmishra'
// const password = 'n0BCadrfl6PEKM3O'
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/usersTestDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log('MongoDB Connected'))
.catch((err)=>console.log("errrr",err))

// Define schema
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    reuired:true,
    unique:true,
  },
  dob:{
    type:String,
    required:true,
  },
  city:{
    type:String,
    required:true,

  },
  occupation:{
    type:String,
    required:true,

  },
  interests:{
    type:String,
    required:true,

  },
});

// Define model
const User = mongoose.model('User', userSchema);

// Handle POST request
app.post('/register', async (req, res) => {
  try {

    console.log(req.body)
    const { name, email, dob, city, occupation, interests } = req.body;

    console.log("NAME",name)
    
    // Create a new user instance
    const newUser = new User({ name, email, dob, city, occupation, interests });
    
    await newUser.save();
    res.status(200).send('User registered successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to register user.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
