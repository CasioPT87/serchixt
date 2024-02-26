require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/node_modules/], // Exclude node_modules from being transpiled
});

const express = require('express');
const path = require('path')
const initial = require('./src/renderers/initial/index.js')
const { getPageNameFromPath, getAllRoutes, getInitialRenderData } = require('./tools/index.js')

const PORT = 9990;
const app = express()

// Serve static files
app.use(express.static(path.join(__dirname, '/src/dist')));

// All allowed routes
app.get(getAllRoutes(), async (req, res) => {
  const path = req.path
  const pageName = getPageNameFromPath({ path })
  const preloadData = await getInitialRenderData({ pageName })
  await initial.default({ response: res, pageName, preloadData })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});