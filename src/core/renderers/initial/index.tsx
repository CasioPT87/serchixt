import React from 'react';
import fs from 'fs';
import path from 'path';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { setUpStore } from '../../../store';
import { createMarkup } from '../utils';
import { getInitialRenderData } from '../../../tools';
import { Page } from '../../../types';
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
  const user = request?.user || null;
  const token = request?.token || null;
  const store = setUpStore({ ...initialState });
  const preloadData = await getInitialRenderData({ page, token });
  const markup = createMarkup({ page, user, store, preloadData });

  let htmlTemplate = fs.readFileSync(
    path.join(process.cwd(), './src/core/html/template.html'),
    'utf-8'
  );
  const styles = fs.readFileSync(
    path.join(process.cwd(), './src/dist-server/main.css'),
    'utf-8'
  );

  const customHeaderStyles = renderToString(<style>{styles}</style>);
  const customBodyContent = renderToString(markup);
  const customScript_1 = renderToString(
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`,
      }}
    ></script>
  );
  const customScript_2 = renderToString(
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_DATA__ = ${JSON.stringify(preloadData).replace(/</g, '\\u003c')}`,
      }}
    ></script>
  );
  const customScript_3 = user
    ? renderToString(
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_USER__ = ${JSON.stringify(user).replace(/</g, '\\u003c')}`,
          }}
        ></script>
      )
    : null;

  const hydrateScript = '<script defer src="bundle.js"></script>';

  htmlTemplate = htmlTemplate.replace(
    '</head>',
    customHeaderStyles + '</head>'
  );
  htmlTemplate = htmlTemplate.replace('</head>', customScript_1 + '</head>');
  htmlTemplate = htmlTemplate.replace('</head>', customScript_2 + '</head>');
  if (customScript_3)
    htmlTemplate = htmlTemplate.replace('</head>', customScript_3 + '</head>');
  htmlTemplate = htmlTemplate.replace('</head>', hydrateScript + '</head>');

  htmlTemplate = htmlTemplate.replace(
    '<div id="app"></div>',
    `<div id="app">${customBodyContent}</div>`
  );

  console.log(htmlTemplate);

  response.setHeader('content-type', 'text/html');
  return response.send(htmlTemplate);
};

export default initial;
