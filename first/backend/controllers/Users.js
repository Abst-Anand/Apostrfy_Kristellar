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

async function handleUniqueCode(req, res) {
  try {
    const user = await UniqueCodeModel.findOne({ uniquecode: req.body.code });

    if (user) {
      console.log(user.email);
      const filter = { uniquecode: req.body.code };
      const update = { $set: { status: true } };

      const temp = await UniqueCodeModel.findOneAndUpdate(filter, update);
      if (temp) {
        const data = {
          status: true,
          message: "Congratulations, Your account is now verified!",
          uniquecode: req.body.code,
        };
        return res.status(200).json(data);
      }
    }
    const data = {
      status: false,
      message: "Unfortunately, we were unable to find the code you entered",
    };
    return res.status(404).json(data);
  } catch (error) {
    const data = {
      status: false,
      message: "Mongo Error",
    };
    console.log("err:", error);
    return res.status(501).json(data);
  }
}

async function handleCreatePassword(req, res) {
  try {
    const userId = req.body.userUniqueCode;
    const password = req.body.userPassword;

    const user = await UniqueCodeModel.findOne({ uniquecode: userId });
    if (user) {
      const filter = { email: user.email }; // Unique email ID to match

      const update = {
        $set: {
          password: password, // Add your new field and value here
        },
      };

      const user2 = await UsersModel.findOneAndUpdate(filter, update);
      if (user2) {
        const data = {
          status: true,
          message: "Your Password has been Created",
        };
        return res.status(200).json(data);
      }
    } else {
      const data = {
        status: false,
        message: "No User found with given Unique Code",
      };
      return res.status(400).json(data);
    }
  } catch (error) {
    const data = {
      status: false,
      message: "Mongo Error",
    };
    console.log("err:", error);
    return res.status(501).json(data);
  }
}

async function handleSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ email, password });
    if(user){
      const data = {
        status:true,
        message:"Login Successful",
        email:email,
      } 
      return res.status(200).json(data)
    }
    const data = {
      status:false,
      message:"Wrong Credentials",
      email:email,
    } 
    return res.status(404).json(data)

    
  } catch (error) {
    const data = {
      status: false,
      message: "Mongo Error",
    };
    console.log("err:", error);
    return res.status(501).json(data);
  }
}

module.exports = {
  handleSignUp,
  handleSignIn,
  handleUniqueCode,
  handleCreatePassword,
};
