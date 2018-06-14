import {Subscribe} from "../subscribe/Subscribe";

/** @class Socket is like an interface to a WebSocketServer **/
export class Socket {
    private _socket: WebSocket;
    private _subscribe: Subscribe;

    connect(endpoint: string): any {
        let _socket = this;
        this._subscribe = new Subscribe();
        this._socket = new WebSocket(endpoint);
        this._socket.onopen = function (e) {
            console.log('connected:', e);
        };
        this._socket.onmessage = function (e) {
            _socket.publish(JSON.parse(e.data));
        };
    }

    subscribe(packet, fn): any {
        this._subscribe.subscribe(packet, fn);
    }

    publish(packet) {
        this._subscribe.publish(packet);
    }
}