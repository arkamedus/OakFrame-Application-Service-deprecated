"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CookieSession = /** @class */ (function () {
    function CookieSession() {
    }
    CookieSession.prototype.setup = function (app) {
        var self = this;
        var cookieSession = require('cookie-session');
        app.use('/(.+)?', function (route) {
            return new Promise(function (resolve, reject) {
                cookieSession({ keys: ['newsecret', 'newsecret'] })(route.getRequest(), route.getResponse(), resolve);
                route.getRequest().cookies = self.parseCookies(route.getRequest().headers.cookie);
            });
        });
    };
    CookieSession.prototype.parseCookies = function (input) {
        var parts = input.split(';');
        var ob = {};
        parts.forEach(function (part, i) {
            parts[i] = part.trim();
            var e = parts[i].split('=');
            ob[e[0]] = e[1];
        });
        return ob;
    };
    return CookieSession;
}());
exports.CookieSession = CookieSession;
