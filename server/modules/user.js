// Import the Mongoose library, which is used for defining and interacting with MongoDB schemas and models.
const mongoose = require('mongoose')

// Define a schema for the "User" collection in your MongoDB database.
const userschema = mongoose.Schema(
    {
        // Define a field named "username" with the data type of String.
        username: { type: String, required: true }, // 'required: true' indicates that this field is mandatory.

        // Define a field named "password" with the data type of String.
        password: { type: String, required: true } // 'required: true' indicates that this field is mandatory.
    }
)

// Create and export a Mongoose model for the "User" collection.
// The 'User' string is the name of the collection, and 'userschema' is the schema you defined.
module.exports = mongoose.model('User', userschema)
