
function userObject (lowerd, username,firstname, lastname, email, password, key) {
	this.lowerd = lowerd;
	this.username = username
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
	this.password = password;
	this.contact = '';
	this.gender = '';
	this.orientation = '',
	this.dob = '';
	this.age = 0;
	this.display = '';
	this.pics = '';
	this.verified = false;
	this.verification = key;
	this.biography = "";
	this.interest = '';
	this.latest = '';
	this.original = '';
	this.popularity = 0;
	this.likes = 0;
	this.liked = '';
	this.blocked = '';
	this.reset = '';
	this.created = Date.now().toString
	this.complete = false;
	this.online = false;
};

module.exports = userObject;