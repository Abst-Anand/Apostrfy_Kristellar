const mongoose = require("mongoose");

const suggestions = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  interests: {
    type: Map,
    of: [String]
  }
});
const SuggestionsModel = mongoose.model('suggestions',suggestions);

module.exports = SuggestionsModel;


// userid - [interest1: [sugg1Id, sugg2Id] ]
// String - Array( String: Array(Ids) )  for each document
