const nodeMail = require('nodemailer')

console.log(nodeMail)

const transporter = nodeMail.createTransport({
    service:"gmail",
    auth:{
        user:"araaz56@gmail.com",
        pass:"vfrx mxnd ktfj yyjs" //google app specfic password
    }
})

const mailOptions = {
    from:"araaz56@gmail.com",
    to:"cse.20bcse33@silicon.ac.in",
    subject:"TESTING NODEMAILER",
    text:"That was easy!"
}

transporter.sendMail(mailOptions, function(err,info){
    if(err)
        console.log("error:",err)
    else{
        console.log('Email Sent:',info)

    }
    
})