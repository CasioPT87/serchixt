"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedStoreReducers = void 0;
const redux_1 = require("redux");
const articles_js_1 = __importDefault(require("./reducers/articles.js"));
const users_js_1 = __importDefault(require("./reducers/users.js"));
exports.combinedStoreReducers = (0, redux_1.combineReducers)({
    article: articles_js_1.default,
    user: users_js_1.default,
});
