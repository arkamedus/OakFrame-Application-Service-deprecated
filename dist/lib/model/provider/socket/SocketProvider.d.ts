/// <reference path="../../../interface/Provider.d.ts" />
import { Endpoint } from "../../endpoint/Endpoint";
import { Provider } from "../../../interface/Provider";
export declare class SocketProvider implements Provider {
    private _url;
    private _endpoint;
    private readonly _websocketserver;
    private _http;
    private readonly _server;
    close(callback: any): any;
    get(instance: any): any;
    then(): any;
    error(): any;
    end(): any;
    define(route: any, response: any): void;
    listen(route: any, callback: any): void;
    constructor(endpoint: Endpoint);
    getEndpoint(): Endpoint;
}
