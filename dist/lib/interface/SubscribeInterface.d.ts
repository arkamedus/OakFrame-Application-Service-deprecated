export interface SubscribeInterface {
    subscribe(identifier: string, callback: any): any;
    publish(identifier: string, data?: any): any;
}
