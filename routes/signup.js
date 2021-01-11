const express = require('express');

const db = require('../config/database');

const router = express.Router();

const bcrypt = require('bcrypt');

const validateUser = require('../utilities/validation/validateUser');

const userObject = require('../utilities/user/userObject');

const signupMail = require('../utilities/user/signupMail');

const sendMail = require('../utilities/user/sendMail');

const randomstring = require('randomstring')

router.get('/', (req, res) => {
	res.render('signup.ejs');
});

router.post('/', (req, res) => {
	const field = req.body;
	let errors = validateUser(field);
	if (field.username != null && field.email != null) {
		let {username, firstname, lastname, email, password} = field;
		const key = randomstring.generate();
		const newUser = new userObject(username.toLowerCase(), username, firstname, lastname, email.toLowerCase(), password, key);
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			insert(newUser, () => {
				mail(email, firstname, key,() => {
					return res.render('signup.ejs',{success: "done"});
				})
			})
		});
	} else if (errors.length == 0 && (field.username != null || field.email != null)) {
		find(field, errors, (err) => {
			return res.send(err);
		});
	} else  {
		return res.send(errors);
	}
});


const insert = (user, cb) => {
	let sql = 'INSERT INTO users SET ?';
	let query = db.query(sql, user, (err, result) => {
		if (err) throw err;
		cb();
	})
}

mail = (mail, firstname, key, cb) => {
	console.log("Sending mail");
	// const options = new signupMail(email, firstname, key);
	// sendMail(options);
	cb();
}

const find = (field, err, cb) => {
	let sql = '';
	if (field.username != null) {
		err = "Username already taken";
		sql = `SELECT * FROM users WHERE lowerd = '${field.username.toLowerCase()}'`;
	} else if (field.email != null) {
		err = "Email already taken";
		sql = `SELECT * FROM users WHERE email = '${field.email.toLowerCase()}'`;
	}
	return userExists(sql, err, cb);
}

const userExists = (sql, error, cb) => {
	db.query(sql, (err, result) => {
		if (err) 
			throw err;
		if (result.length > 0)
			cb(error)
		else
			cb('');
	});
}
module.exports = router;