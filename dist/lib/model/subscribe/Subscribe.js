"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscribe = /** @class */ (function () {
    function Subscribe() {
        this._subscribers = [];
    }
    Subscribe.prototype.getSubscribers = function (identifier) {
        if (!this._subscribers[identifier]) {
            this._subscribers[identifier] = [];
        }
        return this._subscribers[identifier];
    };
    Subscribe.prototype.subscribe = function (identifier, callback) {
        if (!this._subscribers[identifier]) {
            this._subscribers[identifier] = [];
        }
        this._subscribers[identifier].push(callback);
    };
    Subscribe.prototype.publish = function (identifier, data) {
        if (this._subscribers[identifier]) {
            this._subscribers[identifier].forEach(function (subscriber) {
                subscriber(data);
            });
        }
    };
    return Subscribe;
}());
exports.Subscribe = Subscribe;
