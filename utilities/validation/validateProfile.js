
const moment = require('moment')

function validateProfile(profile) {

	let errors = {};
	errors.Birthday = validateBirthday(profile.day, profile.month, profile.year);
	errors.Gender = validateGender(profile.Gender);
	errors.Orientation = validateOrientation(profile.sexualOrientation);
	errors.Interests = validateInterests(profile.Interests);
	errors.Biography = validateBiography(profile.Biography);
	return (errors);
}


function validateGender(gender) {
	if (!gender)
		return ("Please select your gender");
	return ("");
}

function validateOrientation(orientation) {
	if (!orientation)
		return ("Please select your sexuall orientation");
	return ("");
}

function validateBirthday(day, month,  year) {
	if (day == 0 || month == 0 || year == 0)
		return ("Please enter your birthday.");
	else if (!moment(`${day}/${month}/${year}`, 'DD/MM/YYYY').isValid())
		return ("Please enter valid birthday.");
	return ("");
}

function validateBiography(biography) {
	if (biography.length == 0)
		return ("Please include your biography");
	return ("");
}

function validateInterests(interests) {
	if (interests.length == 0)
		return ("Please add atleast one interests");
	return ("");
}


module.exports = validateProfile;

