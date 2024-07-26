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
exports.getPageNameFromPage = exports.getAllowedPage = exports.getHomePage = exports.getInitialRenderData = exports.getAllRoutes = exports.getPageFromPath = void 0;
const routes_1 = __importDefault(require("../routes"));
const routeProtection_1 = require("../routes/routeProtection");
const userIsLogged = true;
const getPageFromPath = ({ path }) => {
    const pageTuple = Object.entries(routes_1.default).find(([pageName, value]) => {
        return value.path === path;
    });
    const page = Object.fromEntries([pageTuple]);
    return page;
};
exports.getPageFromPath = getPageFromPath;
const getPageNameFromPage = ({ page }) => {
    const pageNameArray = Object.keys(page);
    if (pageNameArray.length !== 1)
        throw new Error('Page name not calculated correctly');
    return pageNameArray[0];
};
exports.getPageNameFromPage = getPageNameFromPage;
const getAllowedPage = ({ path }) => {
    if ((0, routeProtection_1.onlyLogged)({ path }) && !userIsLogged) {
        return { page: getHomePage(), isRedirection: true };
    }
    else {
        return { page: getPageFromPath({ path }), isRedirection: false };
    }
};
exports.getAllowedPage = getAllowedPage;
const getAllRoutes = () => {
    return Object.values(routes_1.default).map(({ path }) => path);
};
exports.getAllRoutes = getAllRoutes;
const getInitialRenderData = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    var _b;
    if ((_b = page === null || page === void 0 ? void 0 : page.pageComponent) === null || _b === void 0 ? void 0 : _b.preloadFn) {
        return yield page.pageComponent.preloadFn();
    }
    return null;
});
exports.getInitialRenderData = getInitialRenderData;
const getHomePage = () => {
    const page = Object.fromEntries([Object.entries(routes_1.default).find(([key, value]) => {
            return value.isHome;
        })]);
    return page;
};
exports.getHomePage = getHomePage;
//# sourceMappingURL=index.js.map