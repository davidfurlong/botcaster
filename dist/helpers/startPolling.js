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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPolling = void 0;
const currentNotificationId_1 = require("./currentNotificationId");
const fetchNotifications_1 = require("./fetchNotifications");
let polling = false;
function pollNotifications(farcasterAddress, handler) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (polling)
            return;
        polling = true;
        try {
            const currentNotificationId = yield (0, currentNotificationId_1.getCurrentNotificationId)();
            let currentNotificationIdInSet = true;
            let next = '';
            const notifications = [];
            do {
                const { data } = yield (0, fetchNotifications_1.default)(next, farcasterAddress);
                notifications.push(...Object.values(data.result.notifications || {}));
                if (currentNotificationId) {
                    next = ((_a = data.meta) === null || _a === void 0 ? void 0 : _a.next) || '';
                    currentNotificationIdInSet = notifications.some((n) => n.id === currentNotificationId);
                }
            } while (!!currentNotificationId && !currentNotificationIdInSet && !!next);
            if ((_b = notifications[0]) === null || _b === void 0 ? void 0 : _b.id) {
                yield (0, currentNotificationId_1.setCurrentNotificationId)(notifications[0].id);
            }
            for (const notification of notifications) {
                yield handler(notification);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            polling = false;
        }
    });
}
function startPolling(farcasterAddress, handler) {
    void pollNotifications(farcasterAddress, handler);
    setInterval(() => pollNotifications(farcasterAddress, handler), 10 * 1000);
}
exports.startPolling = startPolling;
//# sourceMappingURL=startPolling.js.map