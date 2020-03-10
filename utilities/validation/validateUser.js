
const validateUserName = require('./userName');
const validateFirstName = require('./firstName');
const validateLastName = require('./lastName');
const validateEmail = require('./email');
const validatePassword = require('./password');

const validateUser = (field) => {
	const errors = [];

	if (field.userName != null) {
	
		return (validateUserName(field.userName));

	} else if (field.firstName != null) {

		return (validateFirstName(field.firstName));
	
	} else if (field.lastName != null) {

		return (validateLastName(field.lastName));

	} else if (field.email != null) {
	
		return (validateEmail(field.email));
	
	} else if (field.password != null) {
	
		return (validatePassword(field.password));
	}
	return ('');
}

module.exports = validateUser;