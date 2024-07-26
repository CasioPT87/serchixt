"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
function addUser(param) {
    return (dispatch, getState) => {
        // esto simula una llamada al backend
        return new Promise(res => {
            setTimeout(() => {
                res(param + 'es el mejon!!!');
            }, 5000);
        }).then(data => {
            // cuando la llamada ha terminado, actualizamos la store
            return dispatch(actions_1.userActions.addUser(data));
        });
    };
}
exports.default = {
    addUser
};
//# sourceMappingURL=user.js.map