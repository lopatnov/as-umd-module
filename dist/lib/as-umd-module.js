"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var javascripttostring_1 = __importDefault(require("javascripttostring"));
function asUmdModule() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var moduleBody = "";
    for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
        var mv = values_1[_a];
        moduleBody += "exports." + mv.name + " = " + javascripttostring_1.default(mv.exports) + ";\n";
    }
    return "(function (global, factory) {\n        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :\n        typeof define === 'function' && define.amd ? define(['exports'], factory) :\n        (global = global || self, factory(global));\n    }(this, function (exports) { 'use strict';\n        " + moduleBody + "\n        Object.defineProperty(exports, '__esModule', { value: true });\n    }));";
}
exports.default = asUmdModule;
//# sourceMappingURL=as-umd-module.js.map