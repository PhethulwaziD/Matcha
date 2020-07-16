const express  = require("express");

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017";


router.get('/', (req, res) => {
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	client.connect( (err, db) => {
		if (err) throw err;
		dbObj = client.db("matchaUsers");
		if (req.query.k == null || req.query.k.length < 32 || req.query.k.length > 32) {
			res.render('verify.ejs', {msg: "Invalid verification link"});
		} else if (req.query.k.length == 32) {
			dbObj.collection("Users").find({verificationKey: req.query.k}).toArray((err, result) => {
			    if (err) throw err;
		       	if (result.length > 0) {
		       		if (result[0].verified == 'Y') {
		       			res.render('verify.ejs', {msg: "Account already verified."});
		       		} else if (result[0].verified == 'N'){
		       			let updates = { $set : {verified: 'Y'} };
		       			dbObj.collection("Users").updateOne({verificationKey: req.query.k}, updates, (err, data) => {
		       				if (err) throw err;
		       				res.render('verify.ejs', {msg: "Account has been verfied, you can now login"});
		       				db.close();
		       			});
		       		}
		        } else {
		        	res.render('verify.ejs', {msg: "Invalid verification link, uknown user"});
		        	db.close();
		        }
			});
		}
	})
});

module.exports = router;