// Importing the 'mongoose' library, which is an ODM (Object Data Modeling) library for MongoDB.
const mongoose = require('mongoose');
const {Int32} = require("mongodb");
const {fakeServer} = require("sinon");

// Creating a schema using the 'Schema' class from mongoose.
const Schema = mongoose.Schema;

// Defining a schema for the 'user' collection in MongoDB.
const itemsSchema = new Schema({
    // Field for storing the id of the item.
    id: {
        type: String,   // Data type is String.
        required: true  // The field is required and must have a value.
    },
    name: {
        type: String,   // Data type is String.
        required: true  // The field is required and must have a value.
    },
    // Field for storing the category of the item as a string.
    category: {
        type: String,   // Data type is String.
        required: true  // The field is required and must have a value.
    },
    // Field for storing the condition of the item as a string.
    condition: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    // Field for storing the poster's id as a string.
    posted_by: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    // Field for storing the zip-code of the poster as a string.
    zip_code: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    // Field for storing the date added of the item as a string.
    date_added: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    // Field for storing the age added of the item as a string.
    age_days: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    // Field for storing the age added of the item as a string.
    age_years: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    description: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    image: {
        type: String,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
    comments: {
        type: Map,   // Data type is String.
        required: false  // The field is required and must have a value.
    },
});

// Creating a model from the schema. This model will represent the 'customers' collection in MongoDB.
// The first argument is the name of the collection, and the second argument is the schema.
const ItemsModel = mongoose.model('items', itemsSchema, 'items');

// Exporting the CustomersModel to be used in other parts of the application.
module.exports = ItemsModel;