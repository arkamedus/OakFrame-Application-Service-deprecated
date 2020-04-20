"use strict";
///<reference path="../../../interface/Provider.ts"/>
///<reference path="../../../interface/Rest.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var ServerProvider = /** @class */ (function () {
    function ServerProvider(endpoint) {
        var _this = this;
        this.http = require('http');
        this.port = 8080;
        this._endpoint = endpoint;
        var requestHandler = function (request, response) {
            _this.route(request, response);
        };
        this.server = this.http.createServer(requestHandler);
        this.server.listen(this.port, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("HTTPServer is listening on port " + _this.port);
        });
    }
    ServerProvider.prototype.route = function (request, response) {
        this._endpoint.route(request, response);
    };
    ServerProvider.prototype.define = function (route, response) {
        this._endpoint.define(route, response);
    };
    ServerProvider.prototype.close = function (callback) {
        if (this.server) {
            this.server.close(function () {
                callback();
            });
        }
    };
    return ServerProvider;
}());
exports.ServerProvider = ServerProvider;
