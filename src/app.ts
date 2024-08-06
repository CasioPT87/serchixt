require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import { getPageValueFromPage } from './tools/pages';
const cookieParser = require('cookie-parser');
const path = require('path');
const initial = require('./renderers/initial');
const { getAllRoutes, getAllowedPage } = require('./tools');
const { getUser } = require('./server-utils/');

const PORT = 9990;
const app = express();

// Serve static files
app.use(express.static(path.join(process.cwd(), './src/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware to catch errors in async middleware/handlers
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

app.use(
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    if (user) {
      req.user = user;
    }
    next();
  })
);

const COOKIE = {
  httpOnly: false, // disables js being able to read the cookie
  secure: process.env.NODE_ENV === 'development' ? false : true, // cookie is sent only through https?
  sameSite: true, // so cookie is not sent to third-party apps
};

app.delete('/cookies', async (req: Request, res: Response) => {
  res.clearCookie(process.env.APP_NAME || '', {
    ...COOKIE,
  });
  return res.json({
    success: true,
  });
});

app.post('/cookies', async (req: Request, res: Response) => {
  const { token } = req.body;
  if (token) {
    res.cookie(process.env.APP_NAME || '', token, {
      ...COOKIE,
      maxAge: 8 * 60 * 60 * 1000, // cookie will be removed after 8 hours
    });
  }

  return res.json({
    success: !!token,
  });
});

// All allowed routes
app.get(
  getAllRoutes(),
  asyncHandler(async (req: Request, res: Response) => {
    const user = await getUser(req);
    if (user) {
      req.user = user;
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

    await initial.default({ response: res, page, user: req.user || null });
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
