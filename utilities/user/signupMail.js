
function signupMail (email, firstName, key) {
	this.from = 'matchaconnect@gmail.com',
	this.to = email,
	this.subject = "Account Verification",
	this.html = 
		`
			<p>Hi ${firstName}<p>
			<p>Thank you for signing up with matcha</p>
			<p>Please click this link to verify your account</p>
			<a href=http://localhost:5000/verify?k=${key}>verify<a/>
		`
}

module.exports = signupMail;