export interface SubscribeInterface {
    subscribe(identifier: string, callback: any);
    publish(identifier:string, data?);
}