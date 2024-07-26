"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const routes_1 = __importDefault(require("../routes"));
const goTo_js_1 = __importDefault(require("../utils/goTo.js"));
const tools_1 = require("../tools");
function usePageMonitor({ pageName: _pageName = 'home' }) {
    const [pageName, setPage] = (0, react_1.useState)(_pageName);
    (0, react_1.useEffect)(() => {
        function changePage({ detail }) {
            setPage(detail.pageName);
        }
        if (typeof document !== 'undefined')
            window.addEventListener('changePage', changePage);
        return () => {
            if (typeof document !== 'undefined')
                window.removeEventListener('changePage', changePage);
        };
    }, []);
    return pageName;
}
if (typeof document !== 'undefined') {
    window.addEventListener('popstate', function (event) {
        const { page } = (0, tools_1.getAllowedPage)({ path: window.location.pathname });
        const pageName = (0, tools_1.getPageNameFromPage)({ page });
        (0, goTo_js_1.default)({ pageName, pushHistoryState: false });
    });
}
function Router({ initialPageName, preloadData }) {
    const pageName = usePageMonitor({ pageName: initialPageName });
    const page = routes_1.default[pageName];
    const { page: allowedPage, isRedirection } = (0, tools_1.getAllowedPage)({ path: page.path });
    const allowedPageName = (0, tools_1.getPageNameFromPage)({ page: allowedPage });
    if (isRedirection) {
        (0, goTo_js_1.default)({ pageName: allowedPageName, redirect: true });
        return null;
    }
    const pageValue = allowedPage[allowedPageName];
    return react_1.default.createElement(pageValue.pageComponent, { preloadData: preloadData[allowedPageName] });
}
exports.default = Router;
