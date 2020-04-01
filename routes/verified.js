const express  = require("express");

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017";


router.get('/', (req, res) => {
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	client.connect( (err, db) => {
		if (err) throw err;
		dbObj = client.db("matchaUsers");
		let msg = '';
		if (req.query.k == null || req.query.k.length < 32 || req.query.k.length > 32) {
			msg = 'Invalid verification link';
			res.render('verified.ejs', {msg: msg});
		} else if (req.query.k.length == 32) {
			dbObj.collection("Users").find({verificationKey: req.query.k}).toArray((err, result) => {
			    if (err) throw err;
		       	if (result.length > 0) {
		       		if (result[0].verified == 'Y') {
		       			msg = "Account already verified.";
		       			res.render('verified.ejs', {msg: msg});
		       		} else if (result[0].verified == 'N'){
		       			let updates = { $set : {verified : 'Y'} };
		       			dbObj.collection("Users").updateOne({verificationKey: req.query.k}, updates, (err, data) => {
		       				if (err) throw err;
		       				msg = "Account has been verfied, you can now login";
		       				res.render('verified.ejs', {msg: msg});
		       				db.close();
		       			});
		       		}
		        } else {
		        	msg = "Invalid verification link, uknown user";
		        	res.render('verified.ejs', {msg: msg});
		        	db.close();
		        }
			});
		}
	})
});

module.exports = router;