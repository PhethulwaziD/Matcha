const express = require('express');

const moment = require('moment');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient


const url = 'mongodb://locahost:27017';

const validateProfile = require('../utilities/validation/validateProfile');

router.get('/', (req, res) => {
	res.render('profile.ejs', {user: {userName: 'lovebite'}, error: {} });
});

let interestArray = [];
router.post('/', (req, res) => {
	const user =  {userName :req.session.username};
	if ((req.body.addInterest || req.body.removeInterest) && !req.body.Gender) {
		if (req.body.addInterest) {
			interestArray.push(req.body.addInterest);
		} else {
			interestArray.pop(req.body.removeInterest);
		}	
	} else if (req.body.day){
		req.body.Interests = interestArray;
		//validate
		errors = validateProfile(req.body); 
		if (errors.Birthday.length != 0 || errors.Gender.length != 0 || errors.Orientation.length != 0 
			 || errors.Interests.length != 0 ||  errors.Biography.length != 0) {
			res.render('profile.ejs', {user: req.body, error: errors});
			console.log(req.body);
			console.log(moment(`${req.body.day}/${req.body.month}/${req.body.year}`))
		} else {
			let options = {
				provider : 'openstreetmap'
			}

			let geocoder = nodeGeocoder(options);
			geocoder.reverse({lat:-28.530553899999997, lon:30.895824200000003}, function(err, res) {
 				 console.log(res);
			});
			/*
			client.connect((err, db) => {
	 			if (err) throw err;
	 			const dbObject = client.db('matchaUsers');
	 			const updates = { $set : {}};
        		dbObject.collection('Users').updateOne(user, updates, (err, data) => {
        			if (err) throw err;
        			db.close();
        		});
	 		});*/
		}
	}
});

module.exports = router;