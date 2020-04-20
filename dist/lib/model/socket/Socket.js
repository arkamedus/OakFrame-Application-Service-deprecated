"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscribe_1 = require("../subscribe/Subscribe");
/** @class Socket is an interface to a WebSocketServer **/
var Socket = /** @class */ (function () {
    function Socket() {
        this._subscribe = new Subscribe_1.Subscribe();
    }
    Socket.prototype.connect = function (endpoint) {
        var _socket = this;
        this._socket = new WebSocket(endpoint);
        this._socket.onopen = function (e) {
            console.log('connected:', e);
            this.send(JSON.stringify({
                handshake: true
            }));
        };
        this._socket.onmessage = function (e) {
            var json = JSON.parse(e.data);
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    var data = json[key];
                    _socket._subscribe.publish(key, data);
                }
            }
            _socket.publish(JSON.parse(e.data), this);
        };
        this._socket.onerror = function (e) {
            console.log('ERR', e);
            _socket.publish(JSON.parse('error'), e);
        };
    };
    Socket.prototype.subscribe = function (slug, fn) {
        this._subscribe.subscribe(slug, fn);
    };
    Socket.prototype.publish = function (packet, connection) {
        this._subscribe.publish(packet, connection);
    };
    return Socket;
}());
exports.Socket = Socket;
