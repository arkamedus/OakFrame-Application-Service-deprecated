"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layer_1 = require("./Layer");
var StringTemplate_1 = require("./template/StringTemplate");
var Route_1 = require("./Route");
var ApplicationRouter = /** @class */ (function () {
    function ApplicationRouter() {
        this._modules = [];
        console.log('APPLICATION ROUTER');
        this._subscribers = [];
        var app = this;
        this._modules = [];
        this.stack = [];
        this.error_stack = [];
        document.body.addEventListener('click', function (event) {
            var clickedElem = event.target;
            var target = clickedElem.closest("a");
            if (target && target.hasAttribute('href')) {
                app.goToPage(target.getAttribute('href'), event);
            }
        }, false);
        window.addEventListener('popstate', function (e) {
            app.route();
        });
    }
    ApplicationRouter.prototype.Template = function (input) {
        return new StringTemplate_1.StringTemplate(input);
    };
    ApplicationRouter.prototype.goToPage = function (route, event) {
        var rel_route = route.replace("//" + window.location.hostname + ":8080", "");
        if (!window.navigator['standalone']) {
            /* iOS hides Safari address bar */
            window.history.pushState({ data: "okay" }, "unknown", route);
        }
        this.route(rel_route);
        /* iOS re-orientation fix */
        if (event) {
            event.preventDefault();
        }
    };
    ApplicationRouter.prototype.focusModule = function (module) {
        this._modules.push(module);
    };
    ApplicationRouter.prototype.use = function (route, fn) {
        this.stack.push(new Layer_1.Layer(route, fn));
    };
    ApplicationRouter.prototype.error = function (route, fn) {
        this.error_stack.push(new Layer_1.Layer(route, fn));
    };
    ApplicationRouter.prototype.route = function (url) {
        var self = this;
        var request_url = url || window.location.pathname || window.location.href;
        var route = new Route_1.Route();
        console.log('SHOULD BE ROUTING TO', request_url);
        var chain = [];
        this.stack.forEach(function (layer) {
            var match = request_url.match(layer.route);
            if (match) {
                chain.push(layer);
            }
        });
        this._modules.forEach(function (module) {
            module.defocus();
        });
        this._modules = [];
        return new Promise(function (resolve, reject) {
            function process() {
                if (chain.length > 0) {
                    var layer = chain.shift();
                    layer.fn(route, self).then(function (value) {
                        process();
                    }).catch(function (e) {
                        console.trace(e, "chain failure");
                        reject('Chain Failed');
                    });
                }
                else {
                    resolve();
                }
            }
            function process_error() {
                if (chain.length > 0) {
                    var layer = chain.shift();
                    layer.fn(self).then(function () {
                        process_error();
                    }).catch(function (e) {
                        console.trace(e, "chain failure");
                        reject('Chain Failed');
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
        }).then(function () {
            document.body.innerHTML = route.body.join('');
            self.publish('route', false);
            self._modules.forEach(function (module) {
                module.focus();
            });
        });
    };
    ApplicationRouter.prototype.subscribe = function (identifier, callback) {
        if (!this._subscribers[identifier]) {
            this._subscribers[identifier] = [];
        }
        this._subscribers[identifier].push(callback);
    };
    ApplicationRouter.prototype.publish = function (identifier, data) {
        if (this._subscribers[identifier]) {
            this._subscribers[identifier].forEach(function (subscriber) {
                subscriber(data);
            });
        }
    };
    return ApplicationRouter;
}());
exports.ApplicationRouter = ApplicationRouter;
