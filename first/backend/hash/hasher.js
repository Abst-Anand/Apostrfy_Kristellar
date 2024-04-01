const bcrypt = require('bcryptjs')



async function hashPassword(password, saltRounds = 10) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.warn(error)
    return "--1null";
  }
}

async function verifyPassword(userProvidedPassword, storedHashedPassword) {
  try {
    const result = await bcrypt.verify(storedHashedPassword, userProvidedPassword);
    return result;
  } catch (error) {
    console.error("Error while verifying password in verifyPassword:", error);
    return false;
  }
}

// exports

module.exports = {
  hashPassword,
  verifyPassword,
};
