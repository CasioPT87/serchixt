"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("../components/home"));
const profile_1 = __importDefault(require("../components/profile"));
const shipments_1 = __importDefault(require("../components/shipments"));
const routes = {
    home: {
        path: '/',
        pageComponent: home_1.default,
        isHome: true,
    },
    profile: {
        path: '/profile',
        pageComponent: profile_1.default,
    },
    shipments: {
        path: '/shipments',
        pageComponent: shipments_1.default
    }
};
exports.default = routes;
//# sourceMappingURL=index.js.map