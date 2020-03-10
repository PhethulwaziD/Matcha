const express = require('express');

const router = express.Router();

const validateUser = require('../utilities/validation/validateUser');

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

const randomstring = require('randomstring');

const sendMail = require('../utilities/user/sendMail');

const resetPasswordMail = require('../utilities/user/resetPasswordMail');

router.get('/', (req, res) => {
	res.render('password');
});

router.post('/', (req, res) => {
	const errors = validateUser(req.body);
	if (errors.length > 0) {
		res.render('password', {email: req.body.email, error: errors});
	} else if (errors.length == 0 && req.body.email != null) {
		const client = MongoClient(uri, {useUnifiedTopology: true});
		client.connect((err, data) => {
			if (err) throw err;
			dbObject = client.db("matchaUsers");
			dbObject.collection("Users").find({email: req.body.email}).toArray((err, result) => {
		        if (err) throw err
	        	if (result.length > 0) {
	        		const key = randomstring.generate();
	        		const user = {email: req.body.email};
	        		const updates = { $set : {resetPasswordKey : key, requestedPasswoReset : 'Y' } };
	        		dbObject.collection('Users').updateOne(user, updates, (err, data) => {
	        			if (err) throw err;
	        			const options = new resetPasswordMail(req.body.email, result.userName, key);
	        			console.log(options);
	        			//sendMail(options);
	        			res.redirect('/reset/password')
	        		})
	        	} else {
	        		res.render('password', {email: req.body.email, error: 'No user with that email exist'});
	        	}
			});
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router

