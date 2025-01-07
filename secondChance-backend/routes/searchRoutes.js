const express = require('express');
const router = express.Router();
const Items = require('../models/items')
const connectToDatabase = require('../models/db');

// Search for gifts
router.get('/', async (req, res, next) => {
  try {
    //await connectToDatabase()
    let documents = await Items.find({category: req.query.category, condition: req.query.condition})

    if (req.query.age_years) {
      const age = parseInt(req.query.age_years)
      documents = documents.find({ age_years: { $lte: age }})
    }

    res.status(200).json(documents);
  } catch (e) {
    res.status(404).next(e);
  }
});

module.exports = router;
