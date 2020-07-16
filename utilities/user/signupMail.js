
function signupMail (email, firstName, key) {
	this.from = 'matchaconnect@gmail.com',
	this.to = email,
	this.subject = "Account Verification",
	this.html = 
		`
			<div style="margin: 0; padding: 0; background: #fff; font-family: sans-serif; color: #17202A; height:215px;">
				<div style="justify-content: center; align-content: center; text-align: center; margin: auto; width: 80%; height:100%">
					<header>
						<a href="/" class="logo" style="color: #194850; height: 60px; line-height: 60px; padding: 0 20;
							text-align: center; font-weight: 700; text-decoration: none; font-size: 35px;">
								Matcha
						</a>
					</header>
					<h2>Hi ${firstName}</h2>
					<p style="font-size: 15px; margin-bottom: 20px;">Thank you for signing up to matcha. Please click this link to verify your account</p>
					<a href=http://localhost:5000/verify?k=${key} style="text-decoration: none;">
						<span 
							style="background: #17202A; border: none; border-radius: 2px; font-family: sans-serif;
							padding: 12px 20px; min-width: 200px; margin: 10px; cursor: pointer; font-size: 15px; color: #fff">
								Verify
						</span>
					<a/>
				</div>
			</div>
		`
}

module.exports = signupMail;