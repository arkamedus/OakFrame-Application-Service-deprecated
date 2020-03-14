///<reference path="../../../interface/Provider.ts"/>
import {Endpoint} from "../../endpoint/Endpoint";
import {Provider} from "../../../interface/Provider";


export class SocketProvider implements Provider {

    private _url: string;
    private _endpoint: Endpoint;
    private readonly _websocketserver;
    private _http;
    private readonly _server;

    close(callback: any): any {
        if (this._server) {
            this._server.close(function () {
                callback();
            });
        }
    }

    get(instance: any): any {
        return instance;
    }

    then(): any {
        return undefined;
    }

    error(): any {
        return undefined;
    }

    end(): any {
        return undefined;
    }

    define(route, response): void {
        // this._endpoint.define(route, response);
    }
    listen(route, callback):void {
        this._endpoint.subscribe(route, callback)
    }

    constructor(endpoint: Endpoint) {
        let provider = this;
        this._endpoint = endpoint;
        this._websocketserver = require('websocket').server;
        this._http = require('http');

        this._server = this._http.createServer(function (request, response) {
            response.statusCode = 426;
            response.setHeader('Connection', "Upgrade");
            response.setHeader('Upgrade', "websocket");
            response.end(`This service requires use of the Websocket protocol.`);
        });

        this._server.listen(3001, function (e) {
            console.log('listening...',e);
        });

        let wsServer = new this._websocketserver({
            httpServer: this._server
        });

        wsServer.on('request', function (request) {
            let connection = request.accept(null, request.origin);
            provider._endpoint.handle(connection);
        });
    }

    getEndpoint(){
        return this._endpoint;
    }

}