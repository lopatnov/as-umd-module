# @lopatnov/as-umd-module

[![NPM version](https://badge.fury.io/js/%40lopatnov%2Fas-umd-module.svg)](https://www.npmjs.com/package/@lopatnov/as-umd-module)
![License](https://img.shields.io/github/license/lopatnov/jsToString)
[![Build Status](https://travis-ci.org/lopatnov/as-umd-module.png?branch=master)](https://travis-ci.org/lopatnov/as-umd-module)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40lopatnov%2Fas-umd-module)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40lopatnov%2Fas-umd-module)

A TypeScript library. It converts JavaScript values to a UMD formatted string.

## Install

[![https://nodei.co/npm/@lopatnov/as-umd-module.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@lopatnov/as-umd-module.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@lopatnov/as-umd-module)

```shell
npm install @lopatnov/as-umd-module
```

[Browser](//lopatnov.github.io/as-umd-module/dist/as-umd-module.js)

```html
<script src="//lopatnov.github.io/as-umd-module/dist/as-umd-module.js"></script>
```

## Import package to the project

```typescript
import asUmdModule from "@lopatnov/as-umd-module";
```

or

```javascript
var asUmdModule = require("@lopatnov/as-umd-module")
```

## Convert JavaScript values into umd module string

```typescript
asUmdModule(...values: IModuleValue[]) => string
```

where

```typescript
interface IModuleValue {
  name: string;
  exports: any;
}
```

Example of using:

```typescript
let umdModule = asUmdModule({
    name: "onmessage",
    exports: function(e) {
        console.log('Worker: Message received from main script');
        let result = multiply(e.data[0], e.data[1]);
        if (isNaN(result)) {
            postMessage('Please write two numbers');
        } else {
            let workerResult = 'Result: ' + result;
            console.log('Worker: Posting message back to main script');
            postMessage(workerResult);
        }
    }
}, {
    name: "multiply",
    exports: function(a, b) {
        return a * b;
    }
});

console.log(umdModule);

/***
Expected result of umdModule variable is string like
"(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = global || self, factory(global));
    }(this, function (exports) { 'use strict';
    exports.onmessage = function(e) {
        console.log('Worker: Message received from main script');
        let result = multiply(e.data[0], e.data[1]);
        if (isNaN(result)) {
            postMessage('Please write two numbers');
        } else {
            let workerResult = 'Result: ' + result;
            console.log('Worker: Posting message back to main script');
            postMessage(workerResult);
        }
    };
    exports.multiply = function(a, b) {
        return a * b;
    };

    Object.defineProperty(exports, '__esModule', { value: true });
}));"

***/
```

## Demo

See, how it's working: [https://runkit.com/lopatnov/as-umd-module-demo](https://runkit.com/lopatnov/as-umd-module-demo)

Test it with a runkit: [https://npm.runkit.com/%40lopatnov%2Fas-umd-module](https://npm.runkit.com/%40lopatnov%2Fas-umd-module)

## Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/as-umd-module/blob/master/LICENSE)

Copyright 2019-2020 Oleksandr Lopatnov
