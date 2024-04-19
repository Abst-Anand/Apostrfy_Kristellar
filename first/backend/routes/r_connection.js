const express = require("express");

const router = express.Router();
const { handleShowConnections, handleAddConnection } = require("../controllers/Connections");



router.post("/showConnections", handleShowConnections);
router.post("/addConnection", handleAddConnection)

module.exports = router