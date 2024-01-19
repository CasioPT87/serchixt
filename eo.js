import Router from "./src/router/index.js";
import { renderToPipeableStream } from "react-dom/server";

const initial = () => {
    const { pipe } = renderToPipeableStream(
        <html>
            <div>hola que tal</div>
        </html>,
        {
            bootstrapScripts: ["/bundle.js"],
            //   onShellReady() {
            //     // response.setHeader('content-type', 'text/html');
            //     // pipe(response);
            //   },
            onAllReady(content) {
                console.log(content);
            },
        }
    );
}


export default initial