import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import Router from './router/index.js';

const getInitialReactCode = (response) => {
    const { pipe } = renderToPipeableStream(<html><Router /></html>, {
        bootstrapScripts: ['/bundle.js'],
        //   onShellReady() {
        //     // response.setHeader('content-type', 'text/html');
        //     // pipe(response);
        //   },
        onAllReady(content) {
            console.log(content)
        }
    });
}


export default getInitialReactCode