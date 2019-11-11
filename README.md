# as-umd-module

JavaScript to umd module string converter

# Install

```
npm i as-umd-module
```

## Import package to the project

```
import asUmdModule from "as-umd-module";
```

## Convert JavaScript values into umd module string

**asUmdModule(...values: IModuleValue[]): string**

where

```
interface IModuleValue {
  name: string;
  exports: any;
}
```

Example of using:

```
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
```

Expected result of umdModule variable is string like

```
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
```

# Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/as-umd-module/blob/master/LICENSE)

Copyright 2019 Oleksandr Lopatnov
