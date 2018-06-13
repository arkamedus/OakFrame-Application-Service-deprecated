///<reference path="../../../interface/Provider.ts"/>
import {Endpoint} from "../../endpoint/Endpoint";
import {Provider} from "../../../interface/Provider";

export class SocketProvider implements Provider {

    private _url: string;
    private _endpoint: Endpoint;
    private _websocketserver;
    private _http;

    close(callback: any): any {
        return undefined;
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

        let server = this._http.createServer(function (request, response) {
        });
        server.listen(3001, function () {
        });

        let wsServer = new this._websocketserver({
            httpServer: server
        });

        wsServer.on('request', function (request) {
            let connection = request.accept(null, request.origin);
            connection.send(JSON.stringify({err:false,msg:`Ahoy!`}));
            connection.on('message', function (message) {
                if (message.type === 'utf8') {
                    // process WebSocket message
                    this.send(JSON.stringify({err:false,msg:`Ahoy!`}));
                }
            });

            connection.on('close', function (connection) {
                // close user connection
            });

        });
    }

}