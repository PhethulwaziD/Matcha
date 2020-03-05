const express = require('express');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017";

const router = express.Router();

const validateUser = require('../utilities/validation/validateUser');

const userObject = require('../utilities/user/userObject');

const sendMail = require('../utilities/user/sendMail');

const randomstring = require('randomstring')

router.get('/', (req, res) => {
	res.render('signup.ejs');
});

router.post('/', (req, res) => {
	const field = req.body;
	const errors = validateUser(field);
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	client.connect((err, db) => {
		if (err) throw err;
		dbObj = client.db("matchaUsers");
		if (field.userName != null && field.email != null) {
			const key = randomstring.generate();
			const newUser = new userObject(field.userName.toLowerCase(), 
				field.firstName, field.lastName, field.email.toLowerCase(), field.password, key);
			console.log(newUser)
			 dbObj.collection("Users").insertOne(newUser, (err, result) => {
	            if (err) throw err;
	            //check errors again
	            //sendMail(field.firstName, field.email, key);
				res.redirect('/verify'); ;          
	         });
			//res.render('signup.ejs', {errors : errors});
			
		} else if (errors.length == 0 && (field.userName != null || field.email != null)) {
			let message = '';
			let  findObject = {};
			if (field.userName != null) {
				message = "Username already taken";
				findObject = {"userName": field.userName.toLowerCase()};
			} else if (field.email != null) {
				message = "Email already taken"
				findObject = {"email": field.email.toLowerCase()};
			}	
				dbObj.collection("Users").find(findObject).toArray((err, result) => {
			        if (err) throw err
		        	if (result.length > 0) {
						res.send(message);
		        	} else {
		        		res.send('');
		        	}
			    });	
		} else {
			res.send(errors);
		}
	});
});
module.exports = router;