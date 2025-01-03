const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const connectToDatabase = require('../models/db')
const logger = require('../logger')
const Items = require('../models/items')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const {parse} = require('dotenv')

// Define the upload directory path
const directoryPath = 'public/images'

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryPath); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({storage: storage});


// Get all secondChanceItems
router.get('/', async (req, res, next) => {
  logger.info('/ called');
  try {
    const secondChanceItems = await Items.find();
    res.json(secondChanceItems);
  } catch (e) {
    //logger.console.error('oops something went wrong', e)
    next(e);
  }
});


function id(secondChanceItem) {
  const lastItemQuery = Items.findOne().sort({'id': -1})
  console.log("Last item found was " + lastItemQuery.id)
  return (parseInt(lastItemQuery.id) + 1)
}

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    let secondChanceItem = req.body;
    const item = new Items({
      "id": id(secondChanceItem),
      "name": secondChanceItem['name'],
      "category": secondChanceItem['category'],
      "condition": secondChanceItem['category'],
      "date_added": date_added(),
      "zip_code": secondChanceItem['zip_code'],
      "age_days": secondChanceItem['age_days'],
      "age_years": secondChanceItem['age_years'],
      "description": secondChanceItem['description'],
      "image": secondChanceItem['image'],
      "comments": secondChanceItem['comments'],
    });

    // Saving the new item to the MongoDB 'items' collection
    await item.save();
    //logger.info("New user added successfully! " + user.user_name)
    res.status(201).json(secondChanceItem);
  } catch (e) {
    next(e);
  }
});


function date_added() {
  return Math.floor(new Date().getTime() / 1000);
}

// Get a single secondChanceItem by ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const secondChanceItem = await Items.find({id: id})
    if (!secondChanceItem) {
      return res.status(404).send("secondChanceItem not found");
    }
    res.json(secondChanceItem);
  } catch (e) {
    next(e);
  }
});

// Update and existing item
router.put('/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    let id = req.params.id
    const collection = db.collection("secondChanceItems");
    const secondChanceItem = await collection.findOne({id});
    if (!secondChanceItem) {
      logger.error('secondChanceItem not found');
      return res.status(404).json({error: "secondChanceItem not found"});
    }
    secondChanceItem.category = req.body.category;
    secondChanceItem.condition = req.body.condition;
    secondChanceItem.age_days = req.body.age_days;
    secondChanceItem.description = req.body.description;
    secondChanceItem.age_years = Number((secondChanceItem.age_days / 365).toFixed(1));
    secondChanceItem.updatedAt = new Date();

    const updatepreloveItem = await collection.findOneAndUpdate(
      {id},
      {$set: secondChanceItem},
      {returnDocument: 'after'}
    );
    if (updatepreloveItem) {
      res.json({"uploaded": "success"});
    } else {
      res.json({"uploaded": "failed"});
    }
  } catch (e) {
    next(e);
  }
});

// Delete an existing item
router.delete('/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("secondChanceItems");
    const secondChanceItem = await collection.findOne({id});
    if (!secondChanceItem) {
      logger.error('secondChanceItem not found');
      return res.status(404).json({error: "secondChanceItem not found"});
    }
    await collection.deleteOne({id});
    res.json({"deleted": "success"});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
