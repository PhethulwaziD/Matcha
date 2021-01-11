const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'matcha'
});

db.connect( (err) => {
	if(err)
		throw err;
	console.log("Database Conneceted")
})

module.exports = db;

// app.get('/createdb', (req, res) => {
// 	let sql = 'CREATE DATABASE matcha';
// 	db.query(sql, (err, result) => {
// 		if(err)
// 			throw err;
// 		console.log(result);
// 		res.send('Database created');
// 	})
// })

// app.get('/createusertable', (req, res) => {
// 	let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), gender VARCHAR(255), dob VARCHAR(255), sexuality VARCHAR(255), bio BLOB, interests VARCHAR(255),password VARCHAR(255), PRIMARY KEY(id))';
// 	db.query(sql, (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		res.send("Table users created");
// 		console.log(result);
// 	})
// })

// app.get('/addusers', (req, res) => {
// 	let data = {
// 		username: 'pdonga',
// 		firstname: 'Phethulwazi',
// 		lastname: 'Donga',
// 		email: 'pdong@student.wethinkcode.co.za',
// 		gender: 'Male',
// 		dob: Date.now().toString(),
// 		sexuality: 'Heterosexual',
// 		bio: 'I work at Smartenup JW.ORG',
// 		interests: "Swimming, Dancing, Chunkie",
// 		password: 'password'
// 	}
// 	let sql = 'INSERT INTO users SET ?';
// 	let query = db.query(sql, data, (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		console.log(result);
// 		res.send("Successfuly added user");
// 	})
// })

// app.get('/selectusers', (req, res) => {
// 	let sql = 'SELECT * FROM users';
// 	let query = db.query(sql, (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		res.send(result);
// 		console.log(result[0].email);
// 	})
// })

// app.get('/selectuser/:username', (req, res) => {
// 	let sql = `SELECT * FROM users WHERE id = ${req.params.username}`;
// 	let query = db.query(sql, (err, result) => {
// 		if (err) {
// 			throw err;
// 		} 
// 		res.send(result);
// 		console.log(result);
// 	})
// })


// app.get('/updateuser/:id', (req, res) => {
// 	let newUsername = 'lovebite';
// 	let sql = `UPDATE users SET username = '${newUsername}' WHERE id = ${req.params.id}`;
// 	let query = db.query(sql, (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		res.send(result);
// 		console.log(result);
// 	})
// })

// app.get('/deleteuser/:id', (req, res) => {
// 	let newUsername = 'lovebite';
// 	let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
// 	let query = db.query(sql, (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		res.send(result);
// 		console.log(result);
// 	})
// })
