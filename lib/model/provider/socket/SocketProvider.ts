///<reference path="../../../interface/Provider.ts"/>
import {Endpoint} from "../../endpoint/Endpoint";
import {Provider} from "../../../interface/Provider";


export class SocketProvider implements Provider {

    private _url: string;
    private _endpoint: Endpoint;
    private _websocketserver;
    private _http;
    private _server;

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

    define(route, response): any {
        // this._endpoint.define(route, response);
    }

    constructor(endpoint: Endpoint) {
        this._endpoint = endpoint;
        this._websocketserver = require('websocket').server;
        this._http = require('http');

        this._server = this._http.createServer(function (request, response) {
            response.statusCode = 426;
            response.setHeader('Connection', "Upgrade");
            response.setHeader('Upgrade', "websocket");
            response.end(`This service requires use of the Websocket protocol.`);
        });
        this._server.listen(3001, function () {
        });

        let wsServer = new this._websocketserver({
            httpServer: this._server
        });

        wsServer.on('request', function (request) {

            let connection = request.accept(null, request.origin);
            connection.send(JSON.stringify({err: false, msg: `Ahoy!`}));
            connection.on('message', function (message) {
                if (message.type === 'utf8') {
                    // process WebSocket message
                    this.send(JSON.stringify({err: false, msg: `Ahoy!`}));
                }
            });

            connection.on('close', function (connection) {
                // close user connection
            });

        });
    }

}