require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import { getPageValueFromPage } from './tools/pages';
import cors from 'cors';
const cookieParser = require('cookie-parser');
const path = require('path');
const initial = require('./renderers/initial');
const { getAllRoutes, getAllowedPage } = require('./tools');
import { getUser } from './server-utils/';
const { getToken } = require('./server-utils/authorization');

const PORT = 9990;
const app = express();

// Serve static files
app.use(express.static(path.join(process.cwd(), './src/dist')));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? true : 'http://localhost:8080', // true means same origin
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware to catch errors in async middleware/handlers
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

type SameSite = 'none' | 'strict'; // Define a type for allowed values
const sameSiteValue: SameSite =
  process.env.NODE_ENV === 'development' ? 'none' : 'strict';

const COOKIE = {
  httpOnly: true, // disables js being able to read the cookie
  secure: process.env.NODE_ENV === 'development' ? false : true, // cookie is sent only through https?
  sameSite: sameSiteValue, // so cookie is not sent to third-party apps
};

app.delete('/cookies', asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie(process.env.APP_NAME || '', {
      ...COOKIE,
    });  

  return res.json({
    success: true
  });
}))

app.post('/cookies', asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  if (token) {
    res.cookie(process.env.APP_NAME || '', token, {
      ...COOKIE,
      maxAge: 8 * 60 * 60 * 1000,
    });
  }

  return res.json({
    success: !!token,
  });
}));

// All allowed routes
app.get(
  getAllRoutes(),
  asyncHandler(async (req: Request, res: Response) => {
    const token = getToken({ req });
    const user = await getUser({ token });
    if (user) {
      req.user = user;
      req.token = token;
    } else {
      res.clearCookie(process.env.APP_NAME || '', {
        ...COOKIE,
      });
    }

    const path = req.path;
    const { page, needsRedirection } = getAllowedPage({
      path,
      userIsLogged: !!req.user,
    });

    if (needsRedirection) {
      const pageValue = getPageValueFromPage({ page });
      return res.redirect(301, pageValue.path);
    }

    await initial.default({ response: res, request: req, page });
  })
);

app.all('*', (req: Request, res: Response) => {
  return res.status(404);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running here, loko: http://localhost:${PORT}`);
});
