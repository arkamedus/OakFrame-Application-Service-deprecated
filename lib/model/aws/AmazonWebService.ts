/// <reference types="aws-sdk" />
import {SharedIniFileCredentials} from "aws-sdk";

export class AmazonWebService {

    private _aws = require('aws-sdk');
    private _credentials: SharedIniFileCredentials = new this._aws.SharedIniFileCredentials({profile: 'default'});
    private _dynamo;

    constructor() {
        // Set the region and credentials
        this._aws.config.update({region: 'us-east-1'});
        this._aws.config.credentials = this._credentials;
    }

    get AWS() {
        return this._aws;
    }

    get credentials():SharedIniFileCredentials {
        return this._credentials;
    }

    dynamoDB() {
        this._dynamo = this._dynamo || new this._aws.DynamoDB({apiVersion: '2012-10-08'});
        return this._dynamo;
    }

}