"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketProvider = /** @class */ (function () {
    function SocketProvider(endpoint) {
        var provider = this;
        this._endpoint = endpoint;
        this._websocketserver = require('websocket').server;
        this._http = require('http');
        this._server = this._http.createServer(function (request, response) {
            response.statusCode = 426;
            response.setHeader('Connection', "Upgrade");
            response.setHeader('Upgrade', "websocket");
            response.end("This service requires use of the Websocket protocol.");
        });
        this._server.listen(3001, function (e) {
            console.log('listening...', e);
        });
        var wsServer = new this._websocketserver({
            httpServer: this._server
        });
        wsServer.on('request', function (request) {
            var connection = request.accept(null, request.origin);
            provider._endpoint.handle(connection);
        });
    }
    SocketProvider.prototype.close = function (callback) {
        if (this._server) {
            this._server.close(function () {
                callback();
            });
        }
    };
    SocketProvider.prototype.get = function (instance) {
        return instance;
    };
    SocketProvider.prototype.then = function () {
        return undefined;
    };
    SocketProvider.prototype.error = function () {
        return undefined;
    };
    SocketProvider.prototype.end = function () {
        return undefined;
    };
    SocketProvider.prototype.define = function (route, response) {
        // this._endpoint.define(route, response);
    };
    SocketProvider.prototype.listen = function (route, callback) {
        this._endpoint.subscribe(route, callback);
    };
    SocketProvider.prototype.getEndpoint = function () {
        return this._endpoint;
    };
    return SocketProvider;
}());
exports.SocketProvider = SocketProvider;
