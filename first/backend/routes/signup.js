const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/usersTestDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    }
})

  // Define model
const User = mongoose.model('User', userSchema);


// Handle POST request
app.post('/register', async(req,res)=>{
    try {
        const newUser = new User(req.body);
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