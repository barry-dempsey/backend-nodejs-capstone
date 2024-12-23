// Importing the 'mongoose' library, which is an ODM (Object Data Modeling) library for MongoDB.
const mongoose = require('mongoose');

// Creating a schema using the 'Schema' class from mongoose.
const Schema = mongoose.Schema;

// Defining a schema for the 'user' collection in MongoDB.
const usersSchema = new Schema({
    // Field for storing the user's name as a string.
    first_name: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    last_name: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    // Field for storing the user's email address as a string.
    email: {
        type: String,   // Data type is String.
        required: true  // The field is required and must have a value.
    },
    // Field for storing the user's password as a string.
    password: {
        type: String,   // Data type is String.
        required: true  // The field is required and must have a value.
    }
});

// Creating a model from the schema. This model will represent the 'customers' collection in MongoDB.
// The first argument is the name of the collection, and the second argument is the schema.
const UserModel = mongoose.model('users', usersSchema);

// Exporting the CustomersModel to be used in other parts of the application.
module.exports = UserModel;