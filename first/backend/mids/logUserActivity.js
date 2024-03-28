const fs = require("fs");

function logReqRes(filename) {
  const options = { timeZone: "Asia/Kolkata" };
  const indianTime = new Date().toLocaleString("en-IN", options) + ' IST';
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${indianTime} | ${req.ip} | ${req.method} | ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = {
  logReqRes,
};
