/*
 * MongoDB tools
 *   todo move out
 *    Method Detail 
 * Copyright(c) 2009-2333 by Github NO.T233
 * MIT Licensed
 */
const MongoClient = require('mongodb').MongoClient;

let settings = {
	db: 'rosemary',
	host: 'localhost',
	port: 27017
};
/**
 * some Mongodb fn
 * @type {{connect : RoseMongo.connect}}
 */
global.rosemaryDB = null
let RoseMongo = {
	baseOption: {},
	connect: function (callback) {
		if (rosemaryDB) return callback()
		// Connection URL
		const dburl = 'mongodb://localhost:27017';
		// Use connect method to connect to the server
		MongoClient.connect(dburl, function (err, client) {
			// Database Name
			global.rosemaryDB = client.db(settings.db);
			console.log("Connected successfully to server");
			callback()
		});
	},
	insertMany: function (db, collectionName, insertArray, callback) {
		// Get the documents collection
		console.log("collectionName", collectionName);
		const collection = db.collection(collectionName);
		// Insert some documents
		collection.insertMany(insertArray, {ordered: false}, function (err, result) {
			console.log("Inserted documents into the collection");
			callback(result);
		});
	}
}

module.exports = RoseMongo
