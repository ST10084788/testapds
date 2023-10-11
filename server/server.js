// Import the 'https' module for creating an HTTPS server.
const http = require('https');

// Import the Express application defined in 'app.js'.
const app = require('./app');

// Import the 'fs' module for file system operations.
const fs = require('fs');

// Define the port number for the HTTPS server.
const port = 3000;

// Create an HTTPS server using 'http.createServer'.
const server = http.createServer({
    // Read the private key from a file and use it for encryption.
    key: fs.readFileSync('keys/private-key.pem'),

    // Read the SSL certificate from a file and use it for secure communication.
    cert: fs.readFileSync('keys/certificate.pem')
}, app);

// Start the server, listening on the specified port.
server.listen(port);
