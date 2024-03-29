const mongoose = require("mongoose");

const uniqueCodeSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uniquecode: {
    type: String,
    unique: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const uniqueCodeModel = mongoose.model("uniqueCodes", uniqueCodeSchema);

module.exports = uniqueCodeModel;
