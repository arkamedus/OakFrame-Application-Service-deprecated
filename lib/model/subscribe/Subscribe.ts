import {Subscriber} from "./Subscriber";

export class Subscribe {

    _subscribers: any[];

    constructor() {
        this._subscribers = [];
    }

    packet(identifier: string): any {
        return this._subscribers[identifier];
    }

    subscribe(slug: string, callback: any): any {
        if (!this._subscribers[slug]){
            this._subscribers[slug] = [];
        }
        this._subscribers[slug].push(callback);
    }

    publish(packet, data): any {
        if (this._subscribers[packet]){
            this._subscribers[packet].forEach(function(sub){
                return sub(data);
            });
        }
    }
}