/** @class Socket is an interface to a WebSocketServer **/
export declare class Socket {
    private _socket;
    private _subscribe;
    constructor();
    connect(endpoint: string): any;
    subscribe(slug: string, fn: any): any;
    publish(packet: any, connection: any): void;
}
