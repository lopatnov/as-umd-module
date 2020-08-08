import { IJ2SOptions } from '@lopatnov/javascripttostring';
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
declare function asUmdModule(...values: Array<IInnerValue | IModuleValue>): string;
export default asUmdModule;
