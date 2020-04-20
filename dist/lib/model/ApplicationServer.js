"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layer_1 = require("./Layer");
var Route_1 = require("./Route");
var Template_1 = require("./Template");
var ApplicationServer = /** @class */ (function () {
    function ApplicationServer() {
        this.stack = [];
        this.error_stack = [];
        this.hostname = "localhost";
        this.port = 8080;
    }
    ApplicationServer.prototype.Template = function (input) {
        return new Template_1.Template(input);
    };
    ApplicationServer.prototype.register = function (middleware) {
        middleware.setup(this);
    };
    ApplicationServer.prototype.use = function (route, fn) {
        this.stack.push(new Layer_1.Layer(route, fn));
    };
    ApplicationServer.prototype.error = function (route, fn) {
        this.error_stack.push(new Layer_1.Layer(route, fn));
    };
    ApplicationServer.prototype.route = function (route) {
        var self = this;
        var url = require('url');
        var url_parts = url.parse(route.getRequest().url, true);
        route.getRequest().query = url_parts.query;
        route.getRequest().url = route.getRequest().url.split("?")[0];
        route.getRequest().slugs = route.getRequest().url.split('/').filter(function (slug) { return slug !== ''; });
        var chain = [];
        this.stack.forEach(function (layer) {
            var match = route.getRequest().url.match(layer.route);
            if (match) {
                route.getRequest().params = match.slice(1).map(function (slug) {
                    return slug || '/';
                });
                chain.push(layer);
            }
        });
        return new Promise(function (resolve, reject) {
            function process() {
                if (chain.length > 0) {
                    var layer = chain.shift();
                    layer.fn(route, self).then(function (v) {
                        if (route.dropout) {
                            return resolve();
                        }
                        process();
                    }).catch(function (e) {
                        // route.getResponse().end(`CHAIN FAILED`);
                        console.trace(e, "chain failure");
                        //reject('Chain Failed');
                        chain = self.error_stack.slice(0, self.error_stack.length);
                        process_error();
                    });
                }
                else {
                    resolve();
                }
            }
            function process_error() {
                if (chain.length > 0) {
                    var layer = chain.shift();
                    layer.fn(route, self).then(function () {
                        process_error();
                    }).catch(function (e) {
                        console.trace(e, "chain failure");
                        //reject('Chain Failed');
                    });
                }
                else {
                    resolve();
                }
            }
            if (chain.length > 0) {
                process();
            }
            else {
                chain = self.error_stack.slice(0, self.error_stack.length);
                process_error();
            }
        });
    };
    ApplicationServer.prototype.http_listener = function (request, response) {
        var self = this;
        var route = new Route_1.Route();
        route.setRequest(request);
        route.setResponse(response);
        self.route(route).then(function () {
            route.getPayload().then(function (payload) {
                response.end(payload);
            }).catch(function (e) {
                console.trace(e);
            });
        });
    };
    ApplicationServer.prototype.listen = function (port, https) {
        var self = this;
        this.port = port;
        var http = require('http' + (https ? "s" : ''));
        var server;
        if (!https) {
            server = http.createServer(function (request, response) {
                self.http_listener(request, response);
            });
        }
        else {
            var _fs = require('fs');
            var creds = {
                key: _fs.readFileSync('/etc/letsencrypt/live/siakit.com/privkey.pem', 'utf8'),
                cert: _fs.readFileSync('/etc/letsencrypt/live/siakit.com/fullchain.pem', 'utf8')
            };
            server = http.createServer(creds, function (request, response) {
                self.http_listener(request, response);
            });
        }
        server.listen(port, function () {
            require('dns').lookup(require('os').hostname(), function (err, address, fam) {
                self.hostname = process.env.SITE_URL || address;
                console.log("Core HTTP" + (https ? "S" : '') + " Server is listening on " + self.hostname + ":" + port);
            });
        });
    };
    ApplicationServer.prototype.getHostname = function () {
        return this.hostname;
    };
    ApplicationServer.prototype.getPort = function () {
        return this.port;
    };
    return ApplicationServer;
}());
exports.ApplicationServer = ApplicationServer;
