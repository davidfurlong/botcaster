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
exports.getCurrentNotificationId = exports.setCurrentNotificationId = void 0;
const node_persist_1 = require("node-persist");
let initialized = false;
function checkInitialized() {
    return __awaiter(this, void 0, void 0, function* () {
        if (initialized)
            return;
        yield (0, node_persist_1.init)();
        initialized = true;
    });
}
const key = 'currentNotificationId';
function setCurrentNotificationId(currentNotificationId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkInitialized();
        yield (0, node_persist_1.setItem)(key, currentNotificationId);
    });
}
exports.setCurrentNotificationId = setCurrentNotificationId;
function getCurrentNotificationId() {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkInitialized();
        return (0, node_persist_1.getItem)(key);
    });
}
exports.getCurrentNotificationId = getCurrentNotificationId;
//# sourceMappingURL=currentNotificationId.js.map