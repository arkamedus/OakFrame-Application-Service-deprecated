/// <reference types="node" />
import { IncomingMessageQueryParam } from "../model/Route";
import { ServerResponse } from "http";
export interface RouteInterface {
    script: Array<string>;
    style: Array<string>;
    head: Array<string>;
    body: Array<string>;
    request: IncomingMessageQueryParam;
    response: ServerResponse;
    enqueueScript(script: string): any;
    enqueueStyle(style: string): any;
    enqueueHead(head: string): any;
    enqueueBody(body: string): any;
    setResponse(response: ServerResponse): void;
    getResponse(): ServerResponse;
    setRequest(request: IncomingMessageQueryParam): void;
    getRequest(): IncomingMessageQueryParam;
}
