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
const react_redux_1 = require("react-redux");
const async_1 = require("../../store/async");
const actions_1 = require("../../store/actions");
const goTo_js_1 = __importDefault(require("../../utils/goTo.js"));
function Profile() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const userList = (0, react_redux_1.useSelector)(state => state.user.list);
    (0, react_1.useEffect)(() => {
        dispatch(actions_1.userActions.addUser('PEPITO!!!!!'));
        setTimeout(() => {
            dispatch(async_1.userThunk.addUser('MANOLITO!!!!!'));
        }, 3000);
    }, []);
    return (react_1.default.createElement("div", null,
        "Cada vez que se carge esta pagina se mete un usuario en la shop",
        react_1.default.createElement("button", { onClick: () => (0, goTo_js_1.default)({ pageName: 'home' }) }, "go to home"),
        react_1.default.createElement("button", { onClick: () => (0, goTo_js_1.default)({ pageName: 'shipments' }) }, "go to shipments"),
        react_1.default.createElement("ul", null, userList.map(user => react_1.default.createElement("li", { key: user }, user)))));
}
exports.default = Profile;
