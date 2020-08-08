import stringify, { IJ2SOptions } from '@lopatnov/javascripttostring';

export interface IModuleValue {
  name: string;
  exports: any;
  options?: IJ2SOptions;
}

export interface IInnerValue {
  name: string;
  declare: any;
  options?: IJ2SOptions;
}

function asUmdModule(...values: Array<IInnerValue | IModuleValue>): string {
  let moduleBody = "";

  for (let mv of values) {
    const exps = (mv as IModuleValue).exports;
    if (exps !== undefined) {
      moduleBody += `exports.${mv.name} = ${stringify(exps, mv.options)};\n`
    } else {
      moduleBody += `var ${mv.name} = ${stringify((mv as IInnerValue).declare, mv.options)};\n`
    }
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
