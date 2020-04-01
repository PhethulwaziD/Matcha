const express = require('express');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017";

const bcrypt = require('bcrypt');

const validateUser = require('../utilities/validation/validateUser');

router.get('/', (req, res) => {
	if (req.query.k == null || req.query.k.length < 32 || req.query.k.length > 32) {
		res.render('reset.ejs', {error: 'Invalid reset password link'});
	 } else {
	 	const client = MongoClient(uri, { useUnifiedTopology: true });
	 	client.connect( (err, db) => {
	 		if (err) throw err;
	 		const dbObject = client.db('matchaUsers');
	 		dbObject.collection("Users").find({resetPasswordKey: req.query.k}).toArray((err, result) => {
	 		    if (err) throw err;
	 	       	if (result.length > 0) {
	 	       		res.render('reset.ejs', {body :{resetPasswordKey: req.query.k}});
	 	        } else {
	 	        	res.render('reset.ejs', {error: 'Invalid reset password link'});
	 	        }
	 	        db.close();
	 		});
	 	});
	 }
});

router.post('/', (req, res) => {
	if (validateUser({password: req.body.password}).length !== 0) {
		res.render('reset.ejs', {body : req.body, errorOne : validateUser({password: req.body.password})});
	} else if (req.body.password !== req.body.confirmPassword) {
		res.render('reset.ejs', {body : req.body, errorTwo : "Password does not match"});
	} else if (validateUser({password: req.body.password}).length === 0) {
		const client = MongoClient(uri, { useUnifiedTopology: true });
	 	client.connect( (err, db) => {
	 		if (err) throw err;
	 		const dbObject = client.db('matchaUsers');
	 		dbObject.collection("Users").find({resetPasswordKey: req.body.resetPasswordKey}).toArray((err, result) => {
	 		    if (err) throw err;
	 	       	if (result.length > 0) {
	 	       		bcrypt.hash(req.body.password, 10, (err, hash) => {
						if (err) throw err;
						const user = {resetPasswordKey: req.body.resetPasswordKey};
	        			const updates = { $set : {resetPasswordKey : '', password: hash}};
	 	       			dbObject.collection("Users").updateOne(user, updates, (err, data) => {
	 	       				if (err) throw err
	 						res.render('reset.ejs', {error: 'You have successfully reseted your password'}); 
	 						db.close();    					
	 	       			});
		    		});
	 	        } else {
	 	        	res.render('reset.ejs', {error: 'Invalid reset password link'});
	 	        	db.close();
	 	        }
	 		});
	 	});	
	}
});

module.exports = router;