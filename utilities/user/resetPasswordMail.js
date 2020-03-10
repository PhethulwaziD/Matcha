
function resetPasswordMail (email, firstName, key) {
	this.from =  'matchaconnect@gmail.com', // sender address
	this.to = email, // list of receivers
	this.subject = "Password Reset", // Subject line
	this.html = 
		`
			<p>Hi ${firstName}<p>
			<p>
				You've recently requested to reset your password for your Matcha account.
				Please use the the link to reset it
			</p>
			<a href=http://localhost:5000/verify?k=${key}>Reset<a/>
		`
}

module.exports = resetPasswordMail;