"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require('body-parser');
var URLEncoded = /** @class */ (function () {
    function URLEncoded() {
    }
    URLEncoded.prototype.setup = function (app) {
        app.use('/(.+)?', function (route) {
            return new Promise(function (resolve, reject) {
                bodyParser.urlencoded({ limit: '150mb', extended: true })(route.getRequest(), route.getResponse(), resolve);
            });
        });
        app.use('/(.+)?', function (route) {
            return new Promise(function (resolve, reject) {
                bodyParser.json({ limit: '150mb' })(route.getRequest(), route.getResponse(), resolve);
            });
        });
    };
    return URLEncoded;
}());
exports.URLEncoded = URLEncoded;
