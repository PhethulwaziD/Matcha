const nodemailer = require('nodemailer');

function sendMail(firstName, Email, key) {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port : 25, 
    auth: {
      user: 'matchaconnect@gmail.com', 
      pass: 'Password13.' 
    }
  });

  transporter.sendMail({
    from: 'matchaconnect@gmail.com', // sender address
    to: Email, // list of receivers
    subject: "Account Verification", // Subject line
    html: `<p>Hi ${firstName}<p>
			<p>Thank you for signing up with matcha</p>
			<p>Please click this link to verify your account</p>
			<a href=http://localhost:5000/verify?verificationKey=${key}>verify<a/>
    		`
  }, (err, data) => {
  	if (err) throw  err;
  	console.log('Email sent');
  });
}

module.exports = sendMail;