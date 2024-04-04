const mongoose = require("mongoose");

const suggestions = mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  suggesteds:[{
    interest:{
        type:String,
    },
    uid:{
        type:Array,
    }
  }],
});

const SuggestionsModel = mongoose.Model('suggestions',suggestions);

module.exports = SuggestionsModel;


// userid - [interest1: [sugg1Id, sugg2Id], interest2: [sugg1Id, sugg2Id]... ]
// String - Array( String: Array(Ids) )  for each document