import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { setUpStore } from '../../store'
import { createMarkup } from "../utils";
import { getInitialRenderData, getPageNameFromPage } from "../../tools";

const initialState = {}

const initial = async ({ response, page }) => {
    const store = setUpStore(initialState)
    const preloadData = await getInitialRenderData({ page })
    const markup = createMarkup({ pageName: getPageNameFromPage({ page }), store, preloadData })
    
    const { pipe } = renderToPipeableStream(
        <html>
            <div id="app">
                { markup }
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