const express = require("express");
const db = require('../config/database');

const router = express.Router();

router.get('/', (req, res) => {
    // console.log(req.session);
	let sql = 'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, lowerd VARCHAR(255), username VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255), contact VARCHAR(10), gender VARCHAR(50), orientation VARCHAR(50), dob TEXT, age INT, display TEXT, pics TEXT, verified BOOLEAN default 0, verification VARCHAR(50), biography BLOB, interest TEXT, latest VARCHAR(100), original VARCHAR(100),  popularity INT, likes INT, liked TEXT, blocked TEXT, reset VARCHAR(50), created VARCHAR(50), complete BOOLEAN default 0, online BOOLEAN default 0, PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if (err) {
			throw err;
		}
		console.log("Table users created");
        console.log(result);
        setTimeout(() => {
            res.redirect('/');
        }, 2000)
	})
});

module.exports = router;