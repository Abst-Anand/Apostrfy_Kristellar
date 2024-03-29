const express = require("express");
const { handleUniqueCode } = require("../controllers/Users");

const router = express.Router();

router.post("/", handleUniqueCode);

module.exports = router;
