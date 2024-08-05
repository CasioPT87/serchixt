// index.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Object;
    }
  }
}

declare global {
  interface Window {
    __PRELOADED_STATE__?: any;
    __PRELOADED_DATA__?: any;
    __PRELOADED_USER__?: any;
  }
}