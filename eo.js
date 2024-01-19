import React from "react";
import Router from "./src/router/index.js";
import { renderToPipeableStream } from "react-dom/server";

const initial = (res) => {
    const { pipe } = renderToPipeableStream(
        <html>
            <div id="app">
                <Router />
            </div>
        </html>, {
        bootstrapScripts: ["/bundle.js"],
        onShellReady() {
            res.setHeader('content-type', 'text/html');
            pipe(res);
        },
    }
    );
}


export default initial