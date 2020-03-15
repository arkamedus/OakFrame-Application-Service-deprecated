import {Subscriber} from "./Subscriber";
import {SubscribeInterface} from "../../interface/SubscribeInterface";

export class Subscribe implements SubscribeInterface{

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