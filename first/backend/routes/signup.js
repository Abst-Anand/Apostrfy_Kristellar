const express = require("express");

const { handleSignUp, handleUserInterests ,handleCreatePassword } = require("../controllers/Users");

const router = express.Router();

router.post("/", handleSignUp);

router.post("/createpassword",handleCreatePassword)

module.exports = router;
