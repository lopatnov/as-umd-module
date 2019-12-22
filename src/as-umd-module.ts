import stringify from '@lopatnov/javascripttostring';

export interface IModuleValue {
  name: string;
  exports: any;
}

function asUmdModule(...values: IModuleValue[]): string {
  let moduleBody = "";

  for (let mv of values) {
      moduleBody += `exports.${mv.name} = ${stringify(mv.exports)};\n`
  }

  return `(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = global || self, factory(global));
    }(this, function (exports) { 'use strict';
        ${moduleBody}
        Object.defineProperty(exports, '__esModule', { value: true });
    }));`;
}

export default asUmdModule;
