const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const signUpModel = mongoose.model("SignUpModel", signUpSchema);

module.exports = signUpModel;
