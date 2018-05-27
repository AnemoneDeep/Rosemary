const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'RoseMary';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
	assert.equal(err, err);
	console.log("Connected successfully to server");
	// global.DBMongo = dbMongo;
	const db = client.db(dbName);
	
	client.close();
});
