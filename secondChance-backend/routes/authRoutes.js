const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Users = require('../models/users')
const JWT_SECRET = "JWT_SECRET"

// Search for gifts
router.post('/register', async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data)
        let email = data['email'];
        const documents = await Users.find({email: email});
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

module.exports = router;
