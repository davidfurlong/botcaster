"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
function default_1(next, address) {
    return axios.get(next ||
        `https://api.farcaster.xyz/v1/notifications?address=${address}&per_page=10`);
}
exports.default = default_1;
//# sourceMappingURL=fetchNotifications.js.map