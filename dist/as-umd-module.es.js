var types = {}, typesToString = types.toString;
[
    "Boolean",
    "Number",
    "String",
    "Function",
    "Array",
    "Date",
    "RegExp",
    "Object",
    "Map",
    "Set",
    "Error"
].forEach(function (name) {
    types["[object " + name + "]"] = name.toLowerCase();
});
function getInternalType(obj) {
    return obj == null
        ? obj + ""
        : typeof obj === "object" || typeof obj === "function"
            ? types[typesToString.call(obj)] || "object"
            : typeof obj;
}

/**
 * Converts to string the value, if it wasn't before
 * @param value the value, that converts to string
 * @param references the references to stringified objects
 */
function stringify(value, references) {
    var referenceValues = references || [value];
    switch (getInternalType(value)) {
        case "undefined":
            return "undefined";
        case "null":
            return "null";
        case "boolean":
        case "regexp":
            return String(value);
        case "string":
            return JSON.stringify(value);
        case "number":
            if (Number.isNaN(value)) {
                return "Number.NaN";
            }
            switch (value) {
                case Number.POSITIVE_INFINITY:
                    return "Number.POSITIVE_INFINITY";
                case Number.NEGATIVE_INFINITY:
                    return "Number.NEGATIVE_INFINITY";
                case Number.EPSILON:
                    return "Number.EPSILON";
                case Number.MAX_SAFE_INTEGER:
                    return "Number.MAX_SAFE_INTEGER";
                case Number.MIN_SAFE_INTEGER:
                    return "Number.MIN_SAFE_INTEGER";
                case Number.MAX_VALUE:
                    return "Number.MAX_VALUE";
                case Number.MIN_VALUE:
                    return "Number.MIN_VALUE";
                default:
                    return String(value);
            }
        case "bigint":
            return "BigInt(" + value + ")";
        case "symbol":
            switch (value) {
                case Symbol.asyncIterator:
                case Symbol.hasInstance:
                case Symbol.isConcatSpreadable:
                case Symbol.iterator:
                case Symbol.match:
                case Symbol.prototype:
                case Symbol.replace:
                case Symbol.search:
                case Symbol.species:
                case Symbol.split:
                case Symbol.toPrimitive:
                case Symbol.toStringTag:
                case Symbol.unscopables:
                    return value.description;
                default:
                    var description = value.description ? "\"" + value.description + "\"" : "";
                    return "Symbol(" + description + ")";
            }
        case "date":
            if (isNaN(value.getTime())) {
                return "new Date(" + value.toString() + ")";
            }
            return "new Date(" + value.toISOString() + ")";
        case "error":
            var message = JSON.stringify(value.message), fileName = JSON.stringify(value.fileName), lineNumber = JSON.stringify(value.lineNumber);
            return "new Error(" + message + ", " + fileName + ", " + lineNumber + ")";
        case "array":
            if (value.length === 0)
                return "[]";
            value[0] = strignifyRef(value[0], referenceValues);
            var arrayValues = value.reduce(function (x1, x2) { return x1 + ", " + strignifyRef(x2, referenceValues); });
            return "[" + arrayValues + "]";
        case "set":
            var setValues_1 = [];
            value.forEach(function (value1, value2, set) {
                setValues_1.push(strignifyRef(value2, referenceValues));
            });
            if (setValues_1.length === 0)
                return "new Set()";
            return "new Set([" + setValues_1.join(", ") + "])";
        case "map":
            var mapValues_1 = [];
            value.forEach(function (indexValue, key) {
                mapValues_1.push("[" + strignifyRef(key, referenceValues) + ", " + strignifyRef(indexValue, referenceValues) + "]");
            });
            if (mapValues_1.length === 0)
                return "new Map()";
            return "new Map([" + mapValues_1.join(", ") + "])";
        case "object":
            var objectValues = [];
            for (var propertyName in value) {
                if (value.hasOwnProperty(propertyName))
                    objectValues.push(propertyName + ": " + strignifyRef(value[propertyName], referenceValues));
            }
            if (objectValues.length === 0)
                return "{}";
            return "{\n" + objectValues.join(",\n") + "\n}";
        case "function":
            var functionName = value.name || "anonymousFunction";
            var functionObject = "";
            var functionPrototype = "";
            for (var propertyName in value) {
                if (value.hasOwnProperty(propertyName))
                    functionObject += functionName + "." + propertyName + " = " + strignifyRef(value[propertyName], referenceValues) + ";\n";
            }
            for (var propertyName in value.prototype) {
                if (value.prototype.hasOwnProperty(propertyName))
                    functionObject += functionName + ".prototype." + propertyName + " = " + strignifyRef(value.prototype[propertyName], referenceValues) + ";\n";
            }
            if (!functionObject && !functionPrototype) {
                return String(value);
            }
            return "(function(){\n var " + functionName + " = " + String(value) + ";\n " + functionObject + "\n " + functionPrototype + "\n return " + functionName + ";\n}())";
        default:
            return JSON.stringify(value);
    }
}
/**
 * Stringify the value, if it wasn't before
 * @param value the value, that converts to string
 * @param references the references to stringified objects
 */
function strignifyRef(value, references) {
    switch (getInternalType(value)) {
        case "array":
        case "object":
        case "map":
        case "set":
        case "function":
            if (references.indexOf(value) < 0) {
                var referencesLength = references.length;
                references.push(value);
                var refString = stringify(value, references);
                references.splice(referencesLength);
                return refString;
            }
            return "null";
        default:
            return stringify(value);
    }
}
/**
 * Converts JavaScript value to string
 * @param value the value of any type
 */
function javaScriptToString(value) {
    return stringify(value);
}

function asUmdModule() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var moduleBody = "";
    for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
        var mv = values_1[_a];
        moduleBody += "exports." + mv.name + " = " + javaScriptToString(mv.exports);
    }
    return "(function (global, factory) {\n        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :\n        typeof define === 'function' && define.amd ? define(['exports'], factory) :\n        (global = global || self, factory(global));\n    }(this, function (exports) { 'use strict';\n        " + moduleBody + "\n        Object.defineProperty(exports, '__esModule', { value: true });\n    }));";
}

export default asUmdModule;
//# sourceMappingURL=as-umd-module.es.js.map
