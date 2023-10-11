// Import the Mongoose library, which is used for defining and interacting with MongoDB schemas and models.
const mongoose = require('mongoose')

// Define a schema for the "Characters" collection in your MongoDB database.
const characterschema = mongoose.Schema(
    {
        // Define a field named "id" with the data type of String.
        id: { type: String, required: true }, // 'required: true' indicates that this field is mandatory.

        // Define a field named "name" with the data type of String.
        name: { type: String, required: true } // 'required: true' indicates that this field is mandatory.
    }
)

// Create and export a Mongoose model for the "Characters" collection.
// The 'Characters' string is the name of the collection, and 'characterschema' is the schema you defined.
module.exports = mongoose.model('Characters', characterschema)
