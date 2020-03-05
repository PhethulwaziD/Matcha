
const validateUserName = require('./userName');
const validateFirstName = require('./firstName');
const validateLastName = require('./lastName');
const validateEmail = require('./email');
const validatePassword = require('./password');

const validateUser = (field) => {
	const errors = [];

	if (field.userName != null) {
	
		errors.push(validateUserName(field.userName));

	} else if (field.firstName != null) {

		errors.push(validateFirstName(field.firstName));
	
	} else if (field.lastName != null) {

		errors.push(validateLastName(field.lastName));

	} else if (field.email != null) {
	
		errors.push(validateEmail(field.email));
	
	} else if (field.password != null) {
	
		errors.push(validatePassword(field.password));
	}
	else {
		errors.push('');
	}
	return (errors);
}

module.exports = validateUser;