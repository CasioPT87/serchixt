import React from "react";
import { Provider } from 'react-redux'
import Router from "./src/router/index.js";
import { renderToPipeableStream } from "react-dom/server";
import { setUpStore } from './src/store/index.js'

const initialState = {
    articles: []
}

const initial = ({ response, pageName }) => {
    const store = setUpStore(initialState)
    const { pipe } = renderToPipeableStream(
        <html>
            <div id="app">
                <Provider store={store}>
                    <Router pageName={pageName} />
                </Provider>
            </div>
            <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}` }}></script>
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