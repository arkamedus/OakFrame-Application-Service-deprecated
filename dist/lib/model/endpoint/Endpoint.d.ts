/// <reference path="../subscribe/Subscribe.d.ts" />
/// <reference types="node" />
import { IncomingMessageQueryParam } from "../Route";
import { ServerResponse } from "http";
export declare class Endpoint {
    private _url;
    private _routes;
    private _subscribe;
    private _clients;
    constructor();
    route(request: IncomingMessageQueryParam, response: ServerResponse): any;
    define(route: any, handler: any): void;
    subscribe(route: string, callback: any): void;
    handle(connection: any): void;
    getClients(): any[];
    removeClient(): void;
}
