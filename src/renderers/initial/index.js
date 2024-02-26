import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { setUpStore } from '../../store'
import { createMarkup } from "../utils";

const initialState = {}

const initial = async ({ response, pageName, preloadData }) => {
    const store = setUpStore(initialState)
    
    const { pipe } = renderToPipeableStream(
        <html>
            <div id="app">
                { createMarkup({ pageName, store, preloadData }) }
            </div>
            <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}` }}></script>
            <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_DATA__ = ${JSON.stringify(preloadData).replace(/</g, '\\u003c')}` }}></script>
        </html>, {
        bootstrapScripts: ["/bundle.js"],
        onShellReady() {
            response.setHeader('content-type', 'text/html');
            pipe(response);
        },
    }
    );
}

export default initial