const express = require('express');
const router = express.Router();
const Items = require('../models/items')
const connectToDatabase = require('../models/db');
const Users = require("../models/users");

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        const documents = await Items.find();
        // Initialize the query object
        let query = {};
/**
        // Add the name filter to the query if the name parameter is not empty
        if (req.query.name && req.query.name.trim() !== '') {
            // Using regex for partial match, case-insensitive
            query.name = {$regex: req.query.name, $options: "i"}
        }

        // Task 3: Add other filters to the query
        if (req.query.category) {
            query.category = req.query.category;

        }
        if (req.query.condition) {
            query.condition = req.query.condition;

        }
        if (req.query.age_years) {
            query.age_years = {$lte: parseInt(req.query.age_years)};
        }

        // Task 4: Fetch filtered gifts using the find(query) method.
        // Make sure to use await and store the result in the `gifts` constant
        const gifts = await collection.find({query}).toArray()**/
        res.status(200).json(documents);
    } catch (e) {
        res.status(404).next(e);
    }
});

module.exports = router;
