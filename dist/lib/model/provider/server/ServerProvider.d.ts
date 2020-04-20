/// <reference path="../../../interface/Provider.d.ts" />
/// <reference path="../../../interface/Rest.d.ts" />
/// <reference types="node" />
import { Endpoint } from "../../endpoint/Endpoint";
import { Provider } from "../../../interface/Provider";
import { IncomingMessageQueryParam, Route } from "../../Route";
import { ServerResponse } from "http";
export declare class ServerProvider implements Provider, Rest {
    private _url;
    private http;
    private readonly port;
    private readonly server;
    private _endpoint;
    constructor(endpoint: Endpoint);
    route(request: IncomingMessageQueryParam, response: ServerResponse): any;
    define(route: Route, response: ServerResponse): any;
    close(callback: any): any;
}
