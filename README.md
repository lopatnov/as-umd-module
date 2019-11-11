# as-umd-module

A TypeScript library. It converts JavaScript values to a UMD formatted string.

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

console.log(umdModule);
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

# TBD

```
— Resolve common references

Example:

let commonObject = {
    hello: 'world'
}

function test1() {}
test1.commonObject = commonObject;

function test2() {}
test2.commonObject = commonObject;

let umdModule = asUmdModule(
    {
        name: "test1",
        exports: test1
    }, {
        name: "test2",
        exports: test2
    }
);

Actual output:
"(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = global || self, factory(global));
    }(this, function (exports) { 'use strict';
        exports.test1 = (function(){
            var test1 = function test1() {};
            test1.commonObject = {
                hello: \"world\"
            };
            return test1;
        }());
        exports.test2 = (function(){
            var test2 = function test2() {};
            test2.commonObject = {
                hello: \"world\"
            };
            return test2;
        }());

        Object.defineProperty(exports, '__esModule', { value: true });
}));"


Expected output:
"(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = global || self, factory(global));
    }(this, function (exports) { 'use strict';
        commonObject = {
            hello: \"world\"
        };
        exports.test1 = (function(){
            var test1 = function test1() {};
            test1.commonObject = commonObject;
            return test1;
        }());
        exports.test2 = (function(){
            var test2 = function test2() {};
            test2.commonObject = commonObject;
            return test2;
        }());

        Object.defineProperty(exports, '__esModule', { value: true });
}));"

```

# Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/as-umd-module/blob/master/LICENSE)

Copyright 2019 Oleksandr Lopatnov
