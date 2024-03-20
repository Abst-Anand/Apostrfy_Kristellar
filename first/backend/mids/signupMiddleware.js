const User = require('../models/users');

// Middleware to validate signup data
exports.validateSignupData = (req, res, next) => {
  // Implement your validation logic here
  // Example: Check if required fields are present, validate email format, etc.
  // If validation fails, return an error response
  // If validation passes, call next() to proceed to the next middleware
  next();
};

// Middleware to save user data to MongoDB
exports.saveUserData = async (req, res) => {
  try {
    // Create a new User instance based on request body
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      occupation: req.body.occupation,
      password: req.body.password,
      interests: req.body.interests
    });

    // Save the user data to the database
    await user.save();

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
