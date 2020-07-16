const express = require('express');

const router = express.Router();

const validateUser = require('../utilities/validation/validateUser');

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

const randomstring = require('randomstring');

const sendMail = require('../utilities/user/sendMail');

const resetPasswordMail = require('../utilities/user/resetPasswordMail');

router.get('/', (req, res) => {
	res.render('password.ejs');
});

router.post('/', (req, res) => {
	const errors = validateUser(req.body);
	if (errors.length > 0) {
		res.render('password', {email: req.body.email, error: errors});
	} else if (errors.length == 0 && req.body.email != null) {
		const client = MongoClient(uri, {useUnifiedTopology: true});
		client.connect((err, db) => {
			if (err) throw err;
			let dbObject = client.db("matchaUsers");
			dbObject.collection("Users").find({email: req.body.email}).toArray((err, result) => {
			
		        if (err) throw err
	        	if (result.length > 0) {
	        		console.log(result);
	        		const Username = result[0].firstName;
	        		const key = randomstring.generate();
	        		const user = {email: req.body.email};
	        		const updates = { $set : {resetPasswordKey : key}};
	        		dbObject.collection('Users').updateOne(user, updates, (err, data) => {
	        			if (err) throw err;
	        			const options = new resetPasswordMail(req.body.email, Username, key);
	        			console.log(Username);
	        			//console.log(options);
	        			//sendMail(options);
	        			res.render('password.ejs', {success: 'We have sent you an email with a link to reset yout passwor'});
	        			db.close();
	        		})
	        	} else {
	        		res.render('password.ejs', {email: req.body.email, error: 'No user with that email exists'});
	        	}
			});
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router

