
function userObject (userName,firstName, lastName, email, password, key) {
	this.userName = userName
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.password = password;
	this.contact = '';
	this.gender = '';
	this.birthDate = '';
	this.age = '';
	this.profilePicture = '';
	this.pics = [];
	this.verified = 'N';
	this.verificationKey = key;
	this.biography = "";
	this.interest = [];
	this.location = {latest: "", original: ""};
	this.online = "N";
	this.popularity = 0;
	this.likedBy = [];
	this.blocked = []
	this.date = Date();
};

module.exports = userObject;