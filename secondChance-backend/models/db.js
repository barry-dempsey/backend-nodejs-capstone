// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

/** MongoDB's connection URL with authentication options **/
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = `${process.env.MONGO_DB}`;

async function connectToDatabase() {

    const client = new MongoClient(url);

    // Task 1: Connect to MongoDB
    await client.connect()

    // Task 2: Connect to database giftDB and store in variable dbInstance
    let dbInstance = client.db(dbName)

    // Task 3: Return database instance
    if (dbInstance) {
        return dbInstance
    }
}

module.exports = connectToDatabase;
