const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Users = require('../models/users')
const JWT_SECRET = "JWT_SECRET"

// Search for gifts
router.post('/register', async (req, res, next) => {
    try {
        const data = req.query.formData
        console.log(data)
        let email = data['email'];
        const documents = await Users.findOne({email: email});
        if (documents.length > 0) {
            return res.send("User already exists");
        }

        // Creating a new instance of the User model with data from the request
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        const user = new Users({
            "first_name": data['firstName'],
            "last_name": data['lastName'],
            "password": hash,
            "email": data['email']
        });

        const payload = {
            user: {
                id: user.insertedId,
            },
        };

        const auth_token = jwt.sign(payload, JWT_SECRET);

        // Saving the new customer to the MongoDB 'customers' collection
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
        const data = req.body;
        console.log(data);
        let email = data['email'];
        let password = data['password'];

        const theUser = await Users.findOne({email: email});

        if (theUser) {
            let result = await bcryptjs.compare(req.body.password, theUser.password)
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
        return res.status(500).send('Internal server error');

    }
});

module.exports = router;
