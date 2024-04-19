const express = require("express");

const router = express.Router();


router.post("/send-message", (req, res) => {
  const data = req.body;
  console.log("Router mSg: ", data)
  messageController.sendMessage(io, customIdToSocketIdMap, data);
  res.send("Message sent successfully");
});

module.exports = router;
