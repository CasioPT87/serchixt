"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const goTo_js_1 = __importDefault(require("../../utils/goTo.js"));
const Home = () => {
    const users = (0, react_redux_1.useSelector)(state => state.users);
    const dispatch = (0, react_redux_1.useDispatch)();
    return (react_1.default.createElement("div", null,
        "Home Page",
        react_1.default.createElement("button", { onClick: () => (0, goTo_js_1.default)({ pageName: 'profile' }) }, "dame aqui y vamos al profile")));
};
exports.default = Home;
//# sourceMappingURL=index.js.map