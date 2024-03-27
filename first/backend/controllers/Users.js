const signUpUserModel = require("../models/signUpUserModel");

async function handleSignUp(req, res) {
  try {
    console.log(req.body);
    const { name, email, dob, city, occupation, interests } = req.body;

    console.log("NAME", name);

    const newUser = new signUpUserModel({
      name,
      email,
      dob,
      city,
      occupation,
      interests,
    });

    await newUser.save();
    res.status(200).send("User registered successfully!");
    console.log("done");
  } catch (error) {
    console.log("Error from index:", error);
    res.status(501).send("Failed to register user.");
  }
}

module.exports = {
  handleSignUp,
};
