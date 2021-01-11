const express  = require('express');

const router = express.Router();

const db = require('../config/database');

const bcrypt = require('bcrypt');

const validate = require('../utilities/user/functions')

router.get('/', (req, res) => {
	res.render('signin.ejs', {body:{}, errors: {}});
});

router.post('/', (req, res) => {
	let {username, password} = req.body;
	console.log(username)
	error = validation(username, password);
	if (error.length > 0) {
		res.render('signin.ejs', {body: req.body, error: error});
	} else {
		let sql = queryString(username);
		console.log(sql)
		db.query(sql, (err, user) => {
			if (err) throw err;
			if (user.length == 0)
				res.render('signin.ejs', {body: req.body, error: "No user with that username or email exists"});
			else {
				if (!user[0].verified) {
					res.render('signin.ejs', {body: req.body, error: "Account not yet verified, please verify before trying to sign in"});
				} else {
					bcrypt.compare(password, user[0].password, (err, match) => {
						if (err) throw err;
						if (!match) {
							res.render('signin.ejs', {body: req.body, error: 'Invalid username, email or password'});
						} else {
							online(user[0].id, () => {
								req.session.user = user[0];
								console.log(req.session);
							   	res.redirect('/profile');
							})
						}
					});
				}
			}
		});

	}
});
const validation = (username, password) => {
	let email_error = validate.validateEmail(username);
	let username_error = validate.validateUsername(username);
	let password_error = validate.validatePassword(password);
	if ((email_error.length > 0 && username_error.length > 0) || password_error.length > 0)
		return ('Invalid username, email or password');
	else
		return ('');
}

const queryString = (username) => {
	if (validate.validateEmail(username).length === 0) 
		return `SELECT * FROM users WHERE email = '${username.toLowerCase()}'`;
	else
		return`SELECT * FROM users WHERE username = '${username}'`;
}

const online = (id, cb) => {
	let sql = `UPDATE users SET online = true WHERE id = ${id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		cb();
	})
}

module.exports = router;