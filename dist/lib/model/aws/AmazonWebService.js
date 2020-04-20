"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmazonWebService = /** @class */ (function () {
    function AmazonWebService() {
        this._aws = require('aws-sdk');
        this._credentials = new this._aws.SharedIniFileCredentials({ profile: 'default' });
        // Set the region and credentials
        this._aws.config.update({ region: 'us-east-1' });
        this._aws.config.credentials = this._credentials;
    }
    Object.defineProperty(AmazonWebService.prototype, "AWS", {
        get: function () {
            return this._aws;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmazonWebService.prototype, "credentials", {
        get: function () {
            return this._credentials;
        },
        enumerable: true,
        configurable: true
    });
    AmazonWebService.prototype.dynamoDB = function () {
        this._dynamo = this._dynamo || new this._aws.DynamoDB({ apiVersion: '2012-10-08' });
        return this._dynamo;
    };
    return AmazonWebService;
}());
exports.AmazonWebService = AmazonWebService;
