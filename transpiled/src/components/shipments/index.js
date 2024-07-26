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
const hooks_1 = require("../../hooks");
const goTo_js_1 = __importDefault(require("../../utils/goTo.js"));
const fakeShipmentsFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('https://catfact.ninja/breeds');
    const body = yield data.json();
    return body.data;
});
const Shipments = ({ preloadData: preload }) => {
    const breeds = (0, hooks_1.usePreloadData)({ component: Shipments, preloadDataProp: preload });
    return (react_1.default.createElement("div", null,
        "Shipments page",
        !breeds && react_1.default.createElement("li", null, "spinner"),
        breeds && (react_1.default.createElement("ul", null, breeds.map(breed => {
            return (react_1.default.createElement("li", { key: breed.breed }, `shipment desde ${breed.country} a ${breed.origin}`));
        }))),
        react_1.default.createElement("button", { onClick: () => (0, goTo_js_1.default)({ pageName: 'home' }) }, "al home"),
        react_1.default.createElement("button", { onClick: () => (0, goTo_js_1.default)({ pageName: 'profile' }) }, "al profile")));
};
Shipments.preloadFn = fakeShipmentsFetch;
exports.default = Shipments;
