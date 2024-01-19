const express = require('express');
const path = require('path')

const PORT = 9990;

const app = express()

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '/src/dist')));

// Set up a simple route
app.get('/', async (req, res) => {
    // const getInitialReactCode = await require('./src/index.js')
    // getInitialReactCode(res)
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});