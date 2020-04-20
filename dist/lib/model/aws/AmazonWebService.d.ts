import { SharedIniFileCredentials } from "aws-sdk";
export declare class AmazonWebService {
    private _aws;
    private _credentials;
    private _dynamo;
    constructor();
    get AWS(): any;
    get credentials(): SharedIniFileCredentials;
    dynamoDB(): any;
}
