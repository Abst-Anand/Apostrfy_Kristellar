const express = require("express");

const { handleSignIn } = require("../controllers/Users");

const router = express.Router();

router.post("/", handleSignIn);

module.exports = router;
