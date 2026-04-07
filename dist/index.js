"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const level_1 = __importStar(require("./utils/level"));
const browser_or_node_1 = require("browser-or-node");
const gcloud_1 = require("./utils/gcloud");
const shouldStdLog = () => browser_or_node_1.isBrowser || (browser_or_node_1.isNode && !gcloud_1.isGcloud);
const expandErrors = (item) => {
    return item instanceof Error
        ? (item.stack || "").replace(item.message, item.message.replace(/\n/g, " \\n"))
        : item;
};
const printObjects = (item) => typeof item == "object" ? JSON.stringify(item) : item;
class Logger {
    constructor(logName = "") {
        this.addLogName = (args) => {
            return this.logName
                ? [`[ ${this.logName} ]`, ...args]
                : args;
        };
        this.createGcpPayload = (severity) => (...args) => {
            if (severity == level_1.GcpLevel.ERROR && args.length == 1 && typeof args[0] == "string") {
                args[0] = new Error(args[0]);
            }
            return JSON.stringify({
                severity,
                "message": this.addLogName(args).map(expandErrors).map(printObjects).join(" "),
                ...gcloud_1.serviceContext
            });
        };
        this.debug = (...args) => {
            if (level_1.default < level_1.EnvLevel.DEBUG)
                return;
            if (shouldStdLog()) {
                console.log(...this.addLogName(args));
            }
            else {
                console.log(this.createGcpPayload(level_1.GcpLevel.DEBUG)(...args));
            }
        };
        this.info = (...args) => {
            if (level_1.default < level_1.EnvLevel.INFO)
                return;
            if (shouldStdLog()) {
                console.log(...this.addLogName(args));
            }
            else {
                console.log(this.createGcpPayload(level_1.GcpLevel.INFO)(...args));
            }
        };
        this.warn = (...args) => {
            if (level_1.default < level_1.EnvLevel.WARN)
                return;
            if (shouldStdLog()) {
                console.warn(...this.addLogName(args));
            }
            else {
                console.log(this.createGcpPayload(level_1.GcpLevel.WARN)(...args));
            }
        };
        this.error = (...args) => {
            if (shouldStdLog()) {
                console.error(...this.addLogName(args));
            }
            else {
                console.error(this.createGcpPayload(level_1.GcpLevel.ERROR)(...args));
            }
        };
        this.errIfProd = (...args) => {
            if (shouldStdLog()) {
                console.error(...this.addLogName(args));
            }
            else {
                if ((gcloud_1.GCP.version || "").toLowerCase().includes("prod")) {
                    console.error(this.createGcpPayload(level_1.GcpLevel.ERROR)(...args));
                }
                else {
                    console.warn(this.createGcpPayload(level_1.GcpLevel.WARN)(...args));
                }
            }
        };
        this.logName = logName;
    }
    static create(logName) {
        return new Logger(logName);
    }
}
exports.Logger = Logger;
const defaultLogger = new Logger();
exports.default = defaultLogger;
//# sourceMappingURL=index.js.map