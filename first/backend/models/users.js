const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: Date,
  occupation: String,
  password: String,
  interests: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
