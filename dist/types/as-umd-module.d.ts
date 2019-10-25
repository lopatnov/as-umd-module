export interface IModuleValue {
    name: string;
    exports: any;
}
declare function asUmdModule(...values: IModuleValue[]): string;
export default asUmdModule;
