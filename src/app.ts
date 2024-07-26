require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/node_modules/], // Exclude node_modules from being transpiled
});

const express = require('express');
const path = require('path')
const initial = require('./renderers/initial')
const { getAllRoutes, getAllowedPage } = require('./tools')

const PORT = 9990;
const app = express()

const userIsLogged = false

// Serve static files
app.use(express.static(path.join(__dirname, '../../src/dist')));

// All allowed routes
app.get(getAllRoutes(), async (req: any, res: any) => {
  const path = req.path
  const { page, isRedirection } = getAllowedPage({ path })
  if (isRedirection) {
    return res.redirect(301, page.path)
  }

  await initial.default({ response: res, page })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});