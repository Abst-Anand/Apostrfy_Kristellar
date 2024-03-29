//https://vscode.dev/github/Abst-Anand/Apostrfy_Kristellar/blob/main888ced

const UsersModel = require("../models/UsersModel");
const UniqueCodeModel = require("../models/MapUserAndUniqueCode");

const { sendEmailToUser } = require("../email/sendUniqueCode");

async function codeExists(uniqueCode) {
  const flag = await UniqueCodeModel.findOne({ unique_code: uniqueCode });
  console.log(flag);
  if (flag) return true;
  return false;
}

function generateUniqueCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code;

  do {
    code = "";
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  } while (!codeExists(code));

  return code;
}

async function handleUniqueCode(req, res) {
  try {
    let codeTemp = generateUniqueCode();

    const newUser = new UniqueCodeModel({
      email,
      codeTemp,
    });
    await newUser.save();
    console.log("Verified");
  } catch (error) {
    console.log("Not");
  }
}
async function handleSignUp(req, res) {
  try {
    //console.log(req.body);
    const { name, email, dob, city, occupation, interests } = req.body;
    console.log(req.body);

    console.log("SignUp using \n");
    console.log("Email:", email);
    console.log("Name:", name);

    let codeTemp = generateUniqueCode();
    console.log("Unique Code:", codeTemp);

    const newUserWithUniqueCode = new UniqueCodeModel({
      email,
      uniquecode: codeTemp,
    });

    const newUser = new UsersModel({
      name,
      email,
      dob,
      city,
      occupation,
      interests,
    });

    await newUser.save();
    await newUserWithUniqueCode.save();
    await sendEmailToUser(email, name, codeTemp);

    res.status(200).send("User registered successfully!");
    console.log("done");
  } catch (error) {
    console.log("Error from index:", error);
    res.status(501).send("Failed to register user.");
  }
}

async function handleSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ email });
    console.log("isUser? :", user);
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = {
  handleSignUp,
  handleSignIn,
};
// checkExistence(generateUniqueCode())
