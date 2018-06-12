//** @interface Provider is like a serializable promise
interface Provider {
    then(): any;
    error(): any;
    end(): any;
    close(callback: any): any;
    get(instance: any): any;
}