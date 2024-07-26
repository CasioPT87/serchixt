"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const store_1 = require("../../store");
const utils_1 = require("../utils");
const tools_1 = require("../../tools");
const initialState = {};
const initial = (_a) => __awaiter(void 0, [_a], void 0, function* ({ response, page }) {
    const store = (0, store_1.setUpStore)(initialState);
    const preloadData = yield (0, tools_1.getInitialRenderData)({ page });
    const markup = (0, utils_1.createMarkup)({ pageName: (0, tools_1.getPageNameFromPage)({ page }), store, preloadData });
    const { pipe } = (0, server_1.renderToPipeableStream)(react_1.default.createElement("html", null,
        react_1.default.createElement("div", { id: "app" }, markup),
        react_1.default.createElement("script", { dangerouslySetInnerHTML: { __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}` } }),
        react_1.default.createElement("script", { dangerouslySetInnerHTML: { __html: `window.__PRELOADED_DATA__ = ${JSON.stringify(preloadData).replace(/</g, '\\u003c')}` } })), {
        bootstrapScripts: ["/bundle.js"],
        onShellReady() {
            response.setHeader('content-type', 'text/html');
            pipe(response);
        },
    });
});
exports.default = initial;
//# sourceMappingURL=index.js.map