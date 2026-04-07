"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const browser_or_node_1 = require("browser-or-node");
exports.GCP = {
    service: (_b = (browser_or_node_1.isNode && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.GCP_SERVICE)), (_b !== null && _b !== void 0 ? _b : "")),
    version: (_d = (browser_or_node_1.isNode && ((_c = process.env) === null || _c === void 0 ? void 0 : _c.GCP_VERSION)), (_d !== null && _d !== void 0 ? _d : ""))
};
exports.isGcloud = !!(exports.GCP.service && exports.GCP.version);
exports.serviceContext = {
    "serviceContext": {
        "service": exports.GCP.service,
        "version": exports.GCP.version
    }
};
//# sourceMappingURL=gcloud.js.map