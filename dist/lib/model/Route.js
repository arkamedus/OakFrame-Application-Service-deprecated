"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = /** @class */ (function () {
    function Route() {
        this.body = [];
        this.head = [];
        this.script = [];
        this.style = [];
        this.dropout = false;
    }
    Route.prototype.enqueueScript = function (script) {
        this.script.push(script);
    };
    Route.prototype.enqueueStyle = function (style) {
        this.style.push(style);
    };
    Route.prototype.enqueueHead = function (head) {
        this.head.push(head);
    };
    Route.prototype.enqueueBody = function (body) {
        this.body.push(body);
    };
    Route.prototype.getPayload = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            var style = self.style.join(' ');
            var script = self.script.join(' ');
            resolve("<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, viewport-fit:cover, maximum-scale=1.0, user-scalable=no\">\n      <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.8.2/css/all.css\" integrity=\"sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay\" crossorigin=\"anonymous\">\n      <link href=\"https://fonts.googleapis.com/css?family=DM+Sans:400,400i,500,500i,700,700i&display=swap\" rel=\"stylesheet\">\n      <script type=\"application/ld+json\">\n    {\n      \"@context\": \"https://schema.org\",\n      \"@type\": \"WebSite\",\n      \"url\": \"https://villagers.club/\",\n      \"potentialAction\": {\n        \"@type\": \"SearchAction\",\n        \"target\": \"https://villagers.club/search/{search_term_string}\",\n        \"query-input\": \"required name=search_term_string\"\n      }\n    }\n    </script>\n    <link rel=\"icon\" href=\"/villagers-club-favicon.png\" sizes=\"any\" type=\"image/png\">\n" + self.head.join(' ') + "\n<style>\n" + style + "\n</style>\n</head>\n<body class=\"flex-col\">\n" + self.body.join(' ') + "\n<script type=\"text/javascript\">" + script + "</script>\n</body>\n</html>");
        });
    };
    Route.prototype.getRequest = function () {
        return this.request;
    };
    Route.prototype.getResponse = function () {
        return this.response;
    };
    Route.prototype.setRequest = function (request) {
        this.request = request;
    };
    Route.prototype.setResponse = function (response) {
        this.response = response;
    };
    Route.prototype.end = function () {
        this.dropout = true;
    };
    return Route;
}());
exports.Route = Route;
