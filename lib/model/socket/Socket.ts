import {Subscribe} from "../subscribe/Subscribe";

/** @class Socket is like an interface to a WebSocketServer **/
export class Socket {
    private _socket: WebSocket;
    private _subscribe: Subscribe;

    connect(endpoint: string): any {
        this._socket = new WebSocket(endpoint);
        this._socket.onopen = function (e) {
            console.log('connected:', e);
        }
    }

    subscribe(): any {

    }

    send(packet): any {

    }
}