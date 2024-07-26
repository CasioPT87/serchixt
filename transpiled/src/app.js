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
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react'],
    ignore: [/node_modules/], // Exclude node_modules from being transpiled
});
const express = require('express');
const path = require('path');
const initial = require('./renderers/initial');
const { getAllRoutes, getAllowedPage } = require('./tools');
const PORT = 9990;
const app = express();
const userIsLogged = false;
// Serve static files
app.use(express.static(path.join(__dirname, '../../src/dist')));
// All allowed routes
app.get(getAllRoutes(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const path = req.path;
    const { page, isRedirection } = getAllowedPage({ path });
    if (isRedirection) {
        return res.redirect(301, page.path);
    }
    yield initial.default({ response: res, page });
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
