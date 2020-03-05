function validatePassword (password) {
	const validation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z\d]{8,})$/;
	if (password.length == 0)
		return ("Please enter password");
	else if (password.length < 8)
		return ("Invalid password, must be 8 characters or longer");
	else if (!validation.test(password))
		return ('Password must contain atleast one upppercase or lowercase alphabet and a number');
	return ('');
}

module.exports = validatePassword;