"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    exclusivity: {
        paths: [],
        method: ({ userId }) => {
            if (userId === 1) {
                console.log('eres el usuario 1!!!');
            }
        }
    }
};
//# sourceMappingURL=index.js.map