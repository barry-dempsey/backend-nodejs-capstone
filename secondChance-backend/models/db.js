// db.js
require('dotenv').config();
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

/** MongoDB's connection URL with authentication options **/
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
//const dbName = `${process.env.MONGO_DB}`;
const dbName = "secondChance"

async function connectToDatabase() {

    // MongoDB's connection URI and database name
    const uri = `mongodb://localhost:27017/${dbName}`;
    const dbInstance = mongoose.connect(uri, {'dbName': `${dbName}`});

    // Task 3: Return database instance
    if (dbInstance) {
        return dbInstance
    }
}

module.exports = connectToDatabase;
