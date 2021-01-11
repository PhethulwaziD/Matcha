const validate = require('../user/functions')


const validateUser = (field) => {

	if (field.username != null) {

		return (validate.validateUsername(field.username));

	} else if (field.firstname != null) {

		return (validate.validateFirstName(field.firstname));
	
	} else if (field.lastname != null) {

		return (validate.validateLastName(field.lastname));

	} else if (field.email != null) {
	
		return (validate.validateEmail(field.email));
	
	} else if (field.password != null) {
	
		return (validate.validatePassword(field.password));
	}
	return ('');
}


module.exports = validateUser;