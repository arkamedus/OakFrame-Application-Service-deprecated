/// <reference types="node" />
import { RouteInterface } from "../interface/RouteInterface";
import { IncomingMessage, ServerResponse } from "http";
export interface IncomingMessageQueryParam extends IncomingMessage {
    query: Array<string>;
    params: Array<string>;
    slugs: Array<string>;
    cookies: any;
}
export declare class Route implements RouteInterface {
    body: Array<string>;
    head: Array<string>;
    script: Array<string>;
    style: Array<string>;
    request: IncomingMessageQueryParam;
    response: ServerResponse;
    dropout: boolean;
    constructor();
    enqueueScript(script: string): void;
    enqueueStyle(style: string): void;
    enqueueHead(head: string): void;
    enqueueBody(body: string): void;
    getPayload(): Promise<unknown>;
    getRequest(): IncomingMessageQueryParam;
    getResponse(): ServerResponse;
    setRequest(request: IncomingMessageQueryParam): void;
    setResponse(response: ServerResponse): void;
    end(): void;
}
