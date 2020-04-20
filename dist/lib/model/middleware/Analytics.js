"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnalyticsEvent_1 = require("../AnalyticsEvent");
var Analytics = /** @class */ (function () {
    function Analytics() {
    }
    Analytics.prototype.setup = function (app) {
        app.use('/(.+)?', function (route) {
            return new Promise(function (resolve, reject) {
                var event = new AnalyticsEvent_1.AnalyticsEvent();
                event.url = route.getRequest().url;
                event.method = route.getRequest().method || "unknown";
                event.pragma = route.getRequest().headers.pragma || "no-cache";
                event.cache_control = route.getRequest().headers["cache-control"] || "no-cache";
                event.do_not_track = !!parseInt((route.getRequest().headers["dnt"] || "0").toString());
                event.upgrade_insecure_requests = !!parseInt((route.getRequest().headers["upgrade-insecure-requests"] || "0").toString());
                event.user_agent = route.getRequest().headers["user-agent"] || "";
                event.accept = route.getRequest().headers["accept"] || "";
                event.accept_encoding = route.getRequest().headers["accept-encoding"] || "";
                event.accept_language = route.getRequest().headers["accept-language"] || "";
                event.remote_address = route.getRequest().connection.remoteAddress || "unknown";
                resolve();
            });
        });
        app.use('/analytics/log/', function (route) {
            return new Promise(function (resolve, reject) {
                var response = route.getResponse();
                var request = route.getRequest();
                route.getResponse().writeHead(200, { 'Content-Type': "text/html" });
                response.end("\n    <h1>/log</h1>\n    <p>" + JSON.stringify(request.headers) + "</p>\n    <p>" + JSON.stringify(request.headers.host) + "</p>\n    <p>" + JSON.stringify(request.headers["upgrade-insecure-requests"]) + "</p>\n    <p>" + JSON.stringify(request.connection.remoteAddress) + "</p>\n    <p>" + JSON.stringify(request.socket.remoteAddress) + "</p>\n    ");
                route.end();
                resolve();
            });
        });
    };
    return Analytics;
}());
exports.Analytics = Analytics;
