"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../routes"));
const goTo = ({ pageName, pushHistoryState = true, redirect = false }) => {
    const changePageEvent = new CustomEvent("changePage", {
        detail: { pageName }
    });
    if (typeof document !== 'undefined') {
        if (pushHistoryState)
            window.history.pushState(null, null, routes_1.default[pageName].path);
        else if (redirect)
            window.location.replace(routes_1.default[pageName].path);
        window.dispatchEvent(changePageEvent);
    }
};
exports.default = goTo;
//# sourceMappingURL=goTo.js.map