"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../subscribe/Subscribe.ts"/>
var Subscribe_1 = require("../subscribe/Subscribe");
var Endpoint = /** @class */ (function () {
    function Endpoint() {
        this._routes = [];
        this._clients = [];
        this._subscribe = new Subscribe_1.Subscribe();
        this._url = 'localhost';
    }
    Endpoint.prototype.route = function (request, response) {
        for (var i = 0; i < this._routes.length; i++) {
            var route = this._routes[i];
            var match = request.url.match(route.route);
            if (match) {
                request.params = match.slice(1);
                try {
                    return route.handler(request, response);
                }
                catch (err) {
                    console.log(err.stack);
                    return response.end(JSON.stringify({
                        err: true,
                        url: request.url,
                        message: "No matching Endpoints found",
                        headers: request.headers
                    }));
                }
            }
        }
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
            err: true,
            url: request.url,
            message: "No routes defined for Endpoint",
            headers: request.headers
        }));
    };
    Endpoint.prototype.define = function (route, handler) {
        if (!(route instanceof RegExp)) {
            route = new RegExp("^" + route + "$");
        }
        this._routes.push({ route: route, handler: handler });
    };
    Endpoint.prototype.subscribe = function (route, callback) {
        this._subscribe.subscribe(route, callback);
    };
    Endpoint.prototype.handle = function (connection) {
        var endpoint = this;
        endpoint._clients.push(connection);
        connection.on('message', function (message) {
            if (message.type === 'utf8') {
                var json = JSON.parse(message.utf8Data);
                for (var key in json) {
                    if (json.hasOwnProperty(key)) {
                        var data = { data: json[key], connection: connection };
                        endpoint._subscribe.publish(key, data);
                    }
                }
            }
        });
    };
    Endpoint.prototype.getClients = function () {
        return this._clients;
    };
    Endpoint.prototype.removeClient = function () {
        var idx = -1;
        this.getClients().forEach(function (connection, i) {
            if (!connection.connected) {
                idx = i;
            }
        });
        if (idx >= 0) {
            this._clients.splice(idx, 1);
        }
    };
    return Endpoint;
}());
exports.Endpoint = Endpoint;
