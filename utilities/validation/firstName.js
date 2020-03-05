const validateFirstName = firstName => {
	if (firstName.trim().length == 0)
		return ("Please enter your first name");
	return ('');	
}

module.exports = validateFirstName;