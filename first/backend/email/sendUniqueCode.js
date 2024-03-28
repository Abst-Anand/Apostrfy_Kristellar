const nodeMail = require("nodemailer");

const transporter = nodeMail.createTransport({
  service: "gmail",
  auth: {
    user: "araaz56@gmail.com",
    pass: "vfrx mxnd ktfj yyjs", //google app specfic password
  },
});
function sendEmailToUser(email, name, uniqueCode) {
  // Define the HTML email template
  const htmlTemplate = `
  <html>
  <head>
    <style>
      /* Add your CSS styles here */
    </style>
  </head>
  <body>
    <div>
      <h1>Hello ${name},</h1>
      <p>Thank You choosing us.</p>
      <h2>You unique code is : ${uniqueCode}</h2>
    </div>
    <div id="footer" style="background-color: #f0f0f0; padding: 10px;">
      <p>This is the footer of the email.</p>
      <!-- Add your footer content here -->
    </div>
  </body>
  </html>
`;
  const mailOptions = {
    from: "araaz56@gmail.com",
    to: email,
    subject: "Getting statred with Kristellar Apostrfy",
    //text:"That was easy!"
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log("error:", err);
    else {
      console.log("Email Sent:", info);
    }
  });
}

module.exports = {
  sendEmailToUser,
};
