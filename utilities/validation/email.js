const validateEmail = email => {
	const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	if (email.length === 0)
		return ("Please enter your email");
	else if (!validation.test(email))
		return ('Invalid email address');
	return ('');
}

module.exports = validateEmail;