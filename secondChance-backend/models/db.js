// db.js
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});

const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

/** MongoDB's connection URL with authentication options **/
let url = `${process.env.MONGO_URL}`;
const dbName = "secondChance"

async function connectToDatabase() {

    // MongoDB's connection URI and database name
    const uri = url + dbName;
    mongoose.connect(uri, {'dbName': `${dbName}`});

}

module.exports = connectToDatabase;
