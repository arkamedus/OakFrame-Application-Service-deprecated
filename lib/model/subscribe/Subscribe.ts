import {Subscriber} from "./Subscriber";

export class Subscribe {

    _subscribers: any[];

    constructor() {
        this._subscribers = [];
    }

    packet(identifier:string): any {
        return this._subscribers[identifier];
    }

    subscribe(slug:string, callback:any): any {
        this._subscribers[slug] = callback;
    }

    publish(packet, connection): any {
        console.log('publish',packet);
        for (let property in packet) {
            if (this._subscribers[property]) {
                this._subscribers[property](packet, connection);
            }
        }
    }
}