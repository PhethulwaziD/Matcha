const express  = require('express');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

const bcrypt = require('bcrypt');

const validateUserName = require('../utilities/validation/userName');

const validatePassword = require('../utilities/validation/password');

const validateEmail = require('../utilities/validation/email');

router.get('/', (req, res) => {
	res.render('signin.ejs', {body:{}, errors: {}});
});

router.post('/', (req, res)=> {
	if ((validateEmail(req.body.userName).length != 0 && 
		validateUserName(req.body.userName).length != 0) || 
		validatePassword(req.body.password).length != 0) {
		res.render('signin.ejs', {body: req.body, error: "You entered and invalid username or password"});
	} else {
		let findObject = {};
		if (validateEmail(req.body.userName).length == 0){
			findObject = {"email": req.body.email};
		} else {
			findObject = {"userName": req.body.userName};
		}
		const client = MongoClient(uri, {useUnifiedTopology: true});
		client.connect((err, db) => {
			if (err) throw  err;
			const dbObject = client.db("matchaUsers");
			dbObject.collection("Users").find(findObject).toArray((err, user) => {
		        if (err) throw err
	        	if (user.length == 0) {
					res.render('signin.ejs', {body: req.body, error: "No user with that username exists"});
					db.close();
	        	} else {
	        		if (user[0].verified === 'N') {
	        			res.render('signin.ejs', {body: req.body, error: "Account is not verified, please verify before trying to login"});
	        			db.close();
	        		} else {
		        		bcrypt.compare(req.body.password, user[0].password, (err, match) => {
		        			if (!match) {
		        				res.render('signin.ejs', {body: req.body, error: "You entered an incorrect password"});
		        				db.close();
		        			} else {
		        				const updates = { $set : {online: 'Y'} };
		        				const updateUser = {userName: user[0].userName};
		       					dbObject.collection("Users").updateOne(updateUser, updates, (err, data) => {
		       						if (err) throw err;
		       						req.session.username = user[0].userName;
		       						console.log(req.session);
		       						res.redirect('profile');
		       						db.close();
		       					});
		        			}
		        		});
		        	}
	        	}
		    });
		});

	}
});

module.exports = router;