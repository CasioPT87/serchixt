"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkup = void 0;
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const router_1 = __importDefault(require("../../../src/router"));
const createMarkup = ({ pageName, store, preloadData }) => {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(router_1.default, { initialPageName: pageName, preloadData: { [pageName]: preloadData } })));
};
exports.createMarkup = createMarkup;
//# sourceMappingURL=index.js.map