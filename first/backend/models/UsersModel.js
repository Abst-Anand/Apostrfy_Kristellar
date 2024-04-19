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
    password: {
      type: String,
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
      type: Array,
      required: true,
    },
    displayPicture: {
      type: String,
    },
  },
  { timestamps: true }
);

//model is equivalent to tables in sql. So this model can be used in signup and signin both.
const signUpModel = mongoose.model("users", signUpSchema);

module.exports = signUpModel;
