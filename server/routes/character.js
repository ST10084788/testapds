// Import the Express.js library to create a router.
const express = require('express');
// Create an instance of an Express router.
const router = express.Router();

// Import the Mongoose model for the "Character" collection.
const Character = require('../modules/character');

// Import the authentication middleware for checking if the user is authenticated.
const checkAuth = require('../check-auth');

// Define a GET route to fetch all characters from the "Character" collection.
router.get('', (req, res) => {
    // Use the Mongoose model to find all documents in the "Character" collection.
    Character.find().then((characters) => {
        // Calculate the number of characters found.
        const numberOfCharacters = characters.length;

        res.json({
            // Include the number of characters found in the response message.
            message: `Characters found: ${numberOfCharacters}`,
            characters: characters
        });
    });
});

// Define a POST route to create a new character in the "Character" collection.
router.post('', (req, res) => {
    // Create a new "Character" instance with data from the request body.
    const character = new Character({
        id: req.body.id,
        name: req.body.name
    });
    
    // Save the new character to the database.
    character.save();

    // Respond with a success status and a message.
    res.status(201).json({
        message: 'Character has been created',
        character: character
    });
});

// Define a DELETE route to delete a character from the "Character" collection by its ID.
router.delete('/:id', (req, res) => {
    // Use the Mongoose model to delete one document by its ID.
    Character.deleteOne({ _id: req.params.id })
    .then((result) => {
        // Respond with a success status and a message indicating the character was deleted.
        res.status(200).json({ message: 'Character has been deleted' });
    });
});

// Export the router so it can be used in your Express application.
module.exports = router;
