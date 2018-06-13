///<reference path="../model/endpoint/Endpoint.ts"/>
import {Endpoint} from "../model/endpoint/Endpoint";

//** @interface Provider is like a serializable promise
export interface Provider {
    then(): any;
    error(): any;
    end(): any;
    close(callback: any): any;
    get(instance: any): any;
}