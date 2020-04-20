import { SubscribeInterface } from "../../interface/SubscribeInterface";
export declare class Subscribe implements SubscribeInterface {
    private _subscribers;
    constructor();
    getSubscribers(identifier: string): any;
    subscribe(identifier: string, callback: any): any;
    publish(identifier: any, data?: any): any;
}
