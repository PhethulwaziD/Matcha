const express = require('express');

const moment = require('moment');

const db = require('../config/database');

const router = express.Router();

const validateProfile = require('../utilities/validation/validateProfile');

router.get('/', (req, res) => {
	const username = req.session.user.username;
	res.render('profile.ejs', {user: {username: username}, error: {} });
});

let interests = [];
router.post('/', (req, res) => {
	const username = req.session.user.username;
	if ((req.body.addInterest || req.body.removeInterest) && !req.body.Gender) {
		addRemove(interests,req);
	} else if (req.body.day) {
		req.body.Interests = interests;
		errors = validateProfile(req.body); 
		if (checkErrors(errors)) {
			req.body.username = username;
			res.render('profile.ejs', {user: req.body, error: errors});
		} else {
			const profile = setProfile(req.body);
			console.log(profile);
			updateUser(profile, req.session.user.id, () => {
				res.redirect('/location')
			})
		}
	}
});

const addRemove = (interests, req) => {
	if (req.body.addInterest) {
		interests.push(req.body.addInterest);
	} else {
		interests.pop(req.body.removeInterest);
	}	
}

const checkErrors = (errors) => {
	if (errors.Birthday.length != 0 || errors.Gender.length != 0 || errors.Orientation.length != 0 
		|| errors.Interests.length != 0 ||  errors.Biography.length != 0)
		return (true);
	else 
		return (false);
}

const setProfile = (user) => {
	let dob = new Date(`${user.year}-${user.month}-${user.day}`);
	let date =  new Date();
	let age = date.getFullYear() - dob.getFullYear();
	return ({
		gender: user.Gender,
		orientation: user.sexualOrientation,
		dob: dob.toString(),
		age: age,
		biography: user.Biography,
		interest: user.Interests.join(',')
	});
}

const updateUser = (user, id, cb) => {
	let sql = `UPDATE users SET ? WHERE id = ${id}`;
	let query = db.query(sql, user, (err, result) => {
		if (err) throw err;
		cb();
	})
}
module.exports = router;