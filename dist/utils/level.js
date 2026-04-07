"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_or_node_1 = require("browser-or-node");
var GcpLevel;
(function (GcpLevel) {
    GcpLevel["DEBUG"] = "DEBUG";
    GcpLevel["INFO"] = "INFO";
    GcpLevel["WARN"] = "WARNING";
    GcpLevel["ERROR"] = "ERROR";
})(GcpLevel = exports.GcpLevel || (exports.GcpLevel = {}));
var EnvLevel;
(function (EnvLevel) {
    EnvLevel[EnvLevel["DEBUG"] = 3] = "DEBUG";
    EnvLevel[EnvLevel["INFO"] = 2] = "INFO";
    EnvLevel[EnvLevel["WARN"] = 1] = "WARN";
    EnvLevel[EnvLevel["ERROR"] = 0] = "ERROR";
})(EnvLevel = exports.EnvLevel || (exports.EnvLevel = {}));
const envLogLevel = (browser_or_node_1.isNode && process.env.LOG_LEVEL) || "";
let logLevel = "debug";
if (/^(debug|info|warn|error)$/i.test(envLogLevel)) {
    logLevel = envLogLevel;
}
let level = EnvLevel.DEBUG;
switch (logLevel.toLowerCase()) {
    case "debug": {
        level = EnvLevel.DEBUG;
        break;
    }
    case "info": {
        level = EnvLevel.INFO;
        break;
    }
    case "warn": {
        level = EnvLevel.WARN;
        break;
    }
    case "error": {
        level = EnvLevel.ERROR;
        break;
    }
}
exports.default = level;
//# sourceMappingURL=level.js.map