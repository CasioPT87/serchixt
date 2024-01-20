import React from "react";
import Router from "./src/router/index.js";
import { renderToPipeableStream } from "react-dom/server";

const initial = ({ response, pageName }) => {
    const { pipe } = renderToPipeableStream(
        <html>
            <div id="app">
                <Router pageName={pageName} />
            </div>
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