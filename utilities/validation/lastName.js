const validateFirstName = lastName => {
	if (lastName.trim().length == 0)
		return ("Please enter your last name");
	return ('');	
}

module.exports = validateFirstName;