const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Users = require('../models/users')
const {body, validationResult} = require('express-validator');
const JWT_SECRET = "JWT_SECRET"

// Search for gifts
router.post('/register', async (req, res, next) => {
    try {
        const data = req.headers
        console.log(data)
        let email = data['email'];
        const theUser = await Users.findOne({email: email});
        if (theUser) {
            return res.send("User already exists");
        }

        // Creating a new instance of the User model with data from the request
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(data['password'], salt);

        const user = new Users({
            first_name: data['firstName'],
            last_name: data['lastName'],
            password: hash,
            email: data['email'],
            createdAt: new Date()
        });

        const payload = {
            user: {
                id: user.insertedId
            },
        };

        const auth_token = jwt.sign(payload, JWT_SECRET);

        // Saving the new user to the MongoDB 'users' collection
        await user.save();
        //logger.info("New user added successfully! " + user.user_name)
        res.json({auth_token, email});
    } catch (e) {
        console.log(e)
        res.send(500)
    }
});

router.post('/login', async (req, res) => {
    try {
        const data = req.headers;
        console.log(data);
        let email = data['email'];
        let password = data['password'];

        const theUser = await Users.findOne({email: email});

        if (theUser) {
            let result = await bcryptjs.compare(password, theUser.password)
            if (!result) {
                //logger.error('Passwords do not match');
                return res.status(404).json({error: 'Wrong password'});
            }
            const userName = theUser.firstName;
            const userEmail = theUser.email;

            let payload = {
                user: {
                    first_name: theUser.firstName,
                },
            };
            const auth_token = jwt.sign(payload, JWT_SECRET)
            res.json({auth_token, email});
        } else {
            //logger.error('User not found');
            return res.status(404).json({error: 'User not found'});
        }
    } catch (e) {
        return res.status(500).send('Internal server error ' + e);

    }
});

router.put('/update', async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const email = req.headers.email;

        if (!email) {
            //logger.error('Email not found in the request headers');
            return res.status(400).json({error: "Email not found in the request headers"});
        }
        const existingUser = await Users.findOne({email: email});
        existingUser.updatedAt = new Date();

        const updatedUser = await Users.findOneAndUpdate(
            {email},
            {$set: existingUser},
            {returnDocument: 'after'}
        );
        const payload = {
            user: {
                id: updatedUser._id.toString(),
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({authtoken});
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
