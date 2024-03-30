const express = require("express");

const { handleSignUp, handleCreatePassword } = require("../controllers/Users");

const router = express.Router();

router.post("/", handleSignUp);

router.post("/createpassword",handleCreatePassword)

module.exports = router;
