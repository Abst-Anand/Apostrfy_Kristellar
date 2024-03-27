const nodeMail = require('nodemailer')

console.log(nodeMail)

const transporter = nodeMail.createTransport({
    service:"gmail",
    auth:{
        user:"araaz56@gmail.com",
        pass:"vfrx mxnd ktfj yyjs" //google app specfic password
    }
})

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
      <h1>Hello,</h1>
      <p>This is your email content.</p>
      <!-- Add your content here -->
    </div>
    <div id="footer" style="background-color: #f0f0f0; padding: 10px;">
      <p>This is the footer of the email.</p>
      <!-- Add your footer content here -->
    </div>
  </body>
  </html>
`;
const mailOptions = {
    from:"araaz56@gmail.com",
    to:"cse.20bcse33@silicon.ac.in",
    subject:"TESTING NODEMAILER",
    //text:"That was easy!"
    html: htmlTemplate
}



transporter.sendMail(mailOptions, function(err,info){
    if(err)
        console.log("error:",err)
    else{
        console.log('Email Sent:',info)

    }
    
})