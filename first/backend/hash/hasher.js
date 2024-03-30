const bcrypt = require('bcryptjs');



export const hashPassword = async (password, saltRounds = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password in hashPassword");
  }
};

async function verifyPassword(userProvidedPassword, storedHashedPassword) {
  try {
    // Compare hashed password from login input with hashed password from database
    const result = await bcrypt.compare(
      userProvidedPassword,
      storedHashedPassword
    );
    return result; // Returns true if passwords match, false otherwise
  } catch (error) {
    // Handle error
    console.error("Error while verifying password in verifyPassword:", error);
    return false; // Return false in case of an error
  }
}


