# as-umd-module

A TypeScript library. It converts JavaScript values to a UMD formatted string.

# Install

Node:

[npmjs repository](//www.npmjs.com/package/as-umd-module)

```shell
npm i as-umd-module
```

[github repository](//github.com/lopatnov/as-umd-module/packages)

```shell
npm install @lopatnov/as-umd-module
```

Browser:

```html
<script src="<path to library>/as-umd-module.js"></script>
```

## Import package to the project

```typescript
import asUmdModule from "as-umd-module";
```
or
```javascript
var asUmdModule = require("as-umd-module")
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

# TBD

— [Resolve common references](https://github.com/lopatnov/as-umd-module/issues/1)

# Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/as-umd-module/blob/master/LICENSE)

Copyright 2019 Oleksandr Lopatnov
