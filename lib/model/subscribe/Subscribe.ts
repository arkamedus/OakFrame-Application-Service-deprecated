import {Subscriber} from "./Subscriber";

export class Subscribe {

    private _subscribers: any[];

    constructor() {
        this._subscribers = [];
    }

    getSubscribers(identifier: string): any {
        if (!this._subscribers[identifier]) {
            this._subscribers[identifier] = [];
        }
        return this._subscribers[identifier];
    }

    subscribe(identifier: string, callback: any): any {
        if (!this._subscribers[identifier]) {
            this._subscribers[identifier] = [];
        }
        this._subscribers[identifier].push(callback);
    }

    publish(identifier, data?): any {
        if (this._subscribers[identifier]) {
            this._subscribers[identifier].forEach(function (subscriber) {
                subscriber(data);
            });
        }
    }
}