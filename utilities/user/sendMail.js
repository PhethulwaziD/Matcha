const nodemailer = require('nodemailer');

function sendMail(options) {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port : 25, 
    auth: {
      user: 'matchaconnect@gmail.com', 
      pass: 'Password13.' 
    }
  });

  transporter.sendMail(options, (err, data) => {
  	if (err) throw  err;
  	console.log('Email sent');
  });
}

module.exports = sendMail;