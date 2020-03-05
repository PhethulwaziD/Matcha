function validateUsername(userName) {

	const validation = /^[a-zA-Z\d]+$/;
	if (userName.length === 0)
		return ("Please enter username");
	else if (!validation.test(userName))
		return ('Invalid character, username must be alphanumeric');
	else if (userName.length < 5)
		return ("Invalid username, must be 5 characters or longer");
	return ('');
}

module.exports = validateUsername;