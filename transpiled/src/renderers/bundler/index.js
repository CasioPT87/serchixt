"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore: Unreachable code error
const client_1 = require("react-dom/client");
const tools_1 = require("../../tools");
const store_1 = require("../../store");
const utils_1 = require("../utils");
const domNode = document.getElementById('app');
const { pathname: path } = window.location;
const { page } = (0, tools_1.getAllowedPage)({ path });
if (process.env.NODE_ENV === 'production') {
    // @ts-ignore: Unreachable code error
    const store = (0, store_1.setUpStore)(window.__PRELOADED_STATE__);
    // @ts-ignore: Unreachable code error
    const preloadData = window.__PRELOADED_DATA__;
    // Allow the passed state to be garbage-collected
    // @ts-ignore: Unreachable code error
    delete window.__PRELOADED_STATE__;
    // Allow the passed preload data to be garbage-collected
    // @ts-ignore: Unreachable code error
    delete window.__PRELOADED_DATA__;
    (0, client_1.hydrateRoot)(domNode, (0, utils_1.createMarkup)({ pageName: (0, tools_1.getPageNameFromPage)({ page }), store, preloadData }));
}
else {
    const store = (0, store_1.setUpStore)();
    (0, tools_1.getInitialRenderData)({ page }).then(preloadData => {
        const root = (0, client_1.createRoot)(domNode);
        root.render((0, utils_1.createMarkup)({ pageName: (0, tools_1.getPageNameFromPage)({ page }), store, preloadData }));
    });
}
//# sourceMappingURL=index.js.map