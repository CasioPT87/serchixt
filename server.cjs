const express = require('express');
const path = require('path')
const fs = require('fs')

const PORT = 9990;

const app = express()

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '/src/dist')));

// Set up a simple route
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '/src/dist/index.html'), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Send the HTML content in the response
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});