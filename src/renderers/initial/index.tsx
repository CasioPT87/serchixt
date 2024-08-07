import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToPipeableStream } from 'react-dom/server';
import { setUpStore } from '../../store';
import { createMarkup } from '../utils';
import { getInitialRenderData, getPageNameFromPage } from '../../tools';
import { Page } from '../../types';
import { Request, Response } from 'express';

const initialState = {};

const initial = async ({
  request,
  response,
  page,
}: {
  request: Request;
  response: Response;
  page: Page;
}) => {
  const user = request?.user || null
  const token = request?.token || null
  const store = setUpStore({ ...initialState });
  const preloadData = await getInitialRenderData({ page, token });
  const pageName = getPageNameFromPage({ page });
  const markup = createMarkup({ pageName, user, store, preloadData });

  fs.readFile(
    path.join(process.cwd(), './src/dist-server/main.css'),
    { encoding: 'utf8' },
    (err: NodeJS.ErrnoException | null, styles: string) => {
      if (err) {
        if (err instanceof Error) return console.error(err.stack);
        else throw new Error('throw unknown error');
      }
      const { pipe } = renderToPipeableStream(
        <html>
          <header>
            <style>{styles}</style>
          </header>
          <div id="app">{markup}</div>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_DATA__ = ${JSON.stringify(preloadData).replace(/</g, '\\u003c')}`,
            }}
          ></script>
          {user && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__PRELOADED_USER__ = ${JSON.stringify(user).replace(/</g, '\\u003c')}`,
              }}
            ></script>
          )}
        </html>,
        {
          bootstrapScripts: ['bundle.js'],
          onShellReady() {
            response.setHeader('content-type', 'text/html');
            pipe(response);
          },
        }
      );
    }
  );
};

export default initial;
