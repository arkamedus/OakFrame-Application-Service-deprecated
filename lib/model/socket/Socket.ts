import {Subscribe} from "../subscribe/Subscribe";

/** @class Socket is an interface to a WebSocketServer **/
export class Socket {
    private _socket: WebSocket;
    private _subscribe: Subscribe;

    constructor() {
        this._subscribe = new Subscribe();
    }

    connect(endpoint: string): any {
        let _socket = this;

        this._socket = new WebSocket(endpoint);

        this._socket.onopen = function (e) {
            console.log('connected:', e);
            this.send(JSON.stringify({
                handshake: true
            }));
        };
        this._socket.onmessage = function (e) {
            let json = JSON.parse(e.data);
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    let data = json[key];
                    _socket._subscribe.publish(key, data);
                }
            }
            _socket.publish(JSON.parse(e.data), this);
        };
        this._socket.onerror = function (e) {
            console.log('ERR', e);
            _socket.publish(JSON.parse('error'), e);
        }
    }

    subscribe(slug: string, fn): any {
        this._subscribe.subscribe(slug, fn);
    }

    publish(packet, connection) {
        this._subscribe.publish(packet, connection);
    }
}