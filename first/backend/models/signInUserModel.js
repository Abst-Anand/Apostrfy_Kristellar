const mongoose = require("mongoose");

const signInSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const signInModel = mongoose.model("SignIn", signInSchema);

module.exports = signInModel;
