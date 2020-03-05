const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017";


async function connect() {
	
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	try {
		await client.connect();
		const db = client.db("matchaUsers");
		console.log('Connected to '+ db.databaseName);

		/*
			collections
		const collections = await db.collections();
		collections.forEach(collection => {
			console.log(collection.collectionName);
		});
		*/

		const Users = db.collection("Users");

		const searchCursor = await Users.find({"email": "pdonga@gmail.com"});

		//console.log(await searchCursor.hasNext());

		/*
		while (await searchCursor.hasNext()) {
			console.log(await searchCursor.next());
		}
		*/

		//Another way of pulling data
		
		//OR
		const usersTable = await searchCursor.toArray();
		usersTable.forEach( user => {
			userObject = user;
			console.log(userObject);
		});
		
		//console.table(usersTable);
	} catch(e) {
		// statements
		console.log(e);
	} finally {
		client.close();
	}
}

setTimeout( ()=> {
	module.exports.userObj = 
}, 1000);
