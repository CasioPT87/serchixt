require('dotenv').config()

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/node_modules/], // Exclude node_modules from being transpiled
});

import express, { Request, Response, NextFunction } from 'express';
const cookieParser = require('cookie-parser')
const path = require('path')
const initial = require('./renderers/initial')
const { getAllRoutes, getAllowedPage } = require('./tools')
const { getUser } = require('./server-utils/')

const PORT = 9990;
const app = express()

// Serve static files
app.use(express.static(path.join(__dirname, '../../src/dist')));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Middleware to catch errors in async middleware/handlers
const asyncHandler = (fn) => (req: Request, res, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

app.use(asyncHandler(async (req: Request, res, next: NextFunction) => {
  const user = await getUser(req);
  if (user) req.user = user
  next();
}));

// All allowed routes
app.get(getAllRoutes(), async (req: Request, res: Response) => {
  const path = req.path
  const { page, needsRedirection } = getAllowedPage({ path, userIsLogged: !!req.user })
  if (needsRedirection) {
    return res.redirect(301, page.path)
  }

  await initial.default({ response: res, page, user: req.user || null })
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running here, loko: http://localhost:${PORT}`);
});