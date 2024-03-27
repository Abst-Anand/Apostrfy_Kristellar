const mongoose = require("mongoose");

const databaseName = 'usersTestDB'


async function connectMongoDb(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
