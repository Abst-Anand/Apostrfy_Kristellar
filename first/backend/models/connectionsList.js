const mongoose = require("mongoose");

const connectionsSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  connsList: [{
    userId: String,
    status: {
        type:Boolean,
        default:false
    }
  }],

});

const ConnectionsModel = mongoose.model("connections", connectionsSchema);

module.exports = ConnectionsModel;

//  userid - [frnd1Id:status, frnd2Id:status, frnd3Id:status...]
//  String - Array( String: status )  for each document