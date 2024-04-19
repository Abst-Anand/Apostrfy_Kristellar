const UsersModel = require("../models/UsersModel");
const UniqueCodeModel = require("../models/MapUserAndUniqueCode");

async function getEmailFromUniqueCode(uniCode) {
  const obj = await UniqueCodeModel.findOne({ uniquecode: uniCode });
  return obj.email;
}

async function getUniqueCodeFromEmail(email){
  const obj = await UniqueCodeModel.findOne({email:email})
  return obj.uniquecode
}

async function getUserDetailsFromEmail(emailID) {
  return await UsersModel.findOne({ email: emailID });
}

module.exports = {
  getEmailFromUniqueCode,
  getUniqueCodeFromEmail,
  getUserDetailsFromEmail,
};
