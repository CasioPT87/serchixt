"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyLogged = void 0;
const protectedPaths = {
    regExps: [],
    paths: ['/shipments'],
};
const onlyLogged = ({ path }) => {
    if (protectedPaths.paths.includes(path) || protectedPaths.regExps.some(regex => regex.test(path))) {
        return true;
    }
    return false;
};
exports.onlyLogged = onlyLogged;
