import { Module } from "./module/Module";
import { SubscribeInterface } from "../interface/SubscribeInterface";
import { ModuleRouter } from "./ModuleRouter";
import { StringTemplate } from "./template/StringTemplate";
export declare class ApplicationRouter implements ModuleRouter, SubscribeInterface {
    _modules: Module[];
    private stack;
    private error_stack;
    private _subscribers;
    Template(input: any): StringTemplate;
    constructor();
    goToPage(route: string, event?: any): void;
    focusModule(module: Module): void;
    use(route: any, fn?: any): void;
    error(route: any, fn?: any): void;
    route(url?: any): Promise<void>;
    subscribe(identifier: string, callback: any): any;
    publish(identifier: any, data?: any): any;
}
