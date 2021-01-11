

module.exports = {
    validatePassword: function (password) {
		const validation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z\d]{8,})$/;
		if (password.length == 0)
			return ("Please enter password");
		else if (password.length < 8)
			return ("Invalid password, must be 8 characters or longer");
		else if (!validation.test(password))
			return ('Password must contain atleast one upppercase or lowercase alphabet and a number');
		return ('');
    },
    validateEmail: function (email) {
        const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.trim().length === 0)
            return ("Please enter your email");
        else if (!validation.test(email.trim()))
            return ('Invalid email address');
        return ('');
    },
    validateUsername: function (username) {
        if (username.length === 0)
            return ("Please enter username");
        else if (username.length < 4 || username.length > 20)
            return ("Invalid username, must be 4-20 characters long");
        return ('');
    },
    validateFirstName: function (firstname) {
        if (firstname.trim().length == 0)
            return ("Please enter your first name");
        else if (firstname.trim().length < 1)
            return ("Invalid firstname, must be 1 character or longer");
        else if (firstname.trim().length > 50)
            return ("first name must not exceed 50 characters, please abbreviate");
        return ('');	
    },
     validateLastName: function (lastname) {
        if (lastname.trim().length == 0)
            return ("Please enter your last name");
        else if (lastname.trim().length < 1)
            return ("Invalid lastname, must be 1 character or longer");
        else if (lastname.trim().length > 50)
            return ("lastname must not exceed 50 characters, please abbreviate");
        return ('');	
    }
}

	
