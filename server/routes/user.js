// Import required libraries and modules
const express = require('express');
const router = express.Router();
const User = require('../modules/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
require("dotenv").config();

// Define a POST route for user signup
router.post('/signup', (req, res) => {
    // Hash the user's password using bcrypt
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Create a new User instance with hashed password
            const user = new User({
                username: req.body.username,
                password: hash
            });

            // Save the user to the database
            user.save()
                .then(result => {
                    // Respond with a success status and result
                    res.status(201).json({
                        message: "User created",
                        result: result
                    });
                })
                .catch(err => {
                    // Handle errors and respond with an error status
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

// Define a POST route for user login
router.post('/login', (req, res) => {
    let fetchedUser;

    // Find a user by username in the database
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication Failure - no username"
                });
            }
            fetchedUser = user;

            // Compare the provided password with the stored hashed password
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication failure - incorrect password"
                });
            }

            // Generate a JWT token for the authenticated user
            const token = jwt.sign(
                { username: fetchedUser.username, userid: fetchedUser._id },
                'secret_this_should_be_longer_than_it_is', // Replace with a more secure secret
                // process.env.TOKEN_KEY // Use environment variable for the secret
                { expiresIn: '1h' }
            );

            // Set the token as a cookie
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });

            // Respond with a success status and the token
            res.status(200).json({ Persisting_Token: token });
        })
        .catch(err => {
            // Handle errors and respond with an error status
            return res.status(401).json({
                message: "Authentication Failure"
            });
        });
});

// Export the router to be used in your Express application
module.exports = router;
