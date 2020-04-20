/// <reference types="node" />
import { Layer } from "./Layer";
import { IncomingMessageQueryParam, Route } from "./Route";
import { MiddlewareInterface } from "../interface/Middleware";
import { StackInterface } from "../interface/StackInterface";
import { ServerResponse } from "http";
import { Template } from "./Template";
export declare class ApplicationServer implements StackInterface {
    error_stack: Array<Layer>;
    stack: Array<Layer>;
    private hostname;
    private port;
    Template(input: any): Template;
    constructor();
    register(middleware: MiddlewareInterface): void;
    use(route: any, fn?: any): void;
    error(route: any, fn?: any): void;
    route(route: Route): Promise<unknown>;
    http_listener(request: IncomingMessageQueryParam, response: ServerResponse): void;
    listen(port: number, https?: boolean): void;
    getHostname(): string;
    getPort(): number;
}
