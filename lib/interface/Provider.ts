//** @interface Provider is like a serializable promise
export interface Provider {
    close(callback: any): any;
}