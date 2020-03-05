const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let message = '';

const findUser = (username) => {

client.connect((err, db) => {		
		if (err) throw err;

		dbObj = client.db("matchaUsers");
		
		dbObj.collection("Users").find({"username": username}).toArray((err, result) => {
	        if (err) throw err;
	        if (result.length > 0) {
	            message = "username already taken";
	        }
	        client.close();
	    });
	});
}

setTimeout( ()=> {
	console.log(message);
}, 2000);
