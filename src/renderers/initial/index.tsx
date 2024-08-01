import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { setUpStore } from '../../store'
import { createMarkup } from "../utils";
import { getInitialRenderData, getPageNameFromPage } from "../../tools";
import { Page } from "../../types";
import { Response } from 'express'

const initialState = {}

const initial = async ({ response, page, user }: { response: Response, page: Page, user: Object | null }) => {
    const store = setUpStore({ ...initialState, user })
    const preloadData = await getInitialRenderData({ page })
    const markup = createMarkup({ pageName: getPageNameFromPage({ page }), user, store, preloadData })
    
    const { pipe } = renderToPipeableStream(
        <html>
            <div id="app">
                { markup }
            </div>
            <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}` }}></script>
            <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_DATA__ = ${JSON.stringify(preloadData).replace(/</g, '\\u003c')}` }}></script>
            { user && <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_USER__ = ${JSON.stringify(user).replace(/</g, '\\u003c')}` }}></script> }
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