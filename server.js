require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/node_modules/], // Exclude node_modules from being transpiled
});

const express = require('express');
const path = require('path')
const initial = require('./index.js')
const { getPageNameFromPath, getAllRoutes } = require('./tools/index.js')

const PORT = 9990;
const app = express()

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '/src/dist')));

// Set up a simple route
app.get(getAllRoutes(), async (req, res) => {
  const path = req.path
  const pageName = getPageNameFromPath({ path })
  initial.default({ response: res, pageName })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});