import {SharedIniFileCredentials} from "aws-sdk";

export class AmazonWebService {

	private _aws = require('aws-sdk');
	private _credentials:SharedIniFileCredentials = new this._aws.SharedIniFileCredentials({profile: 'keypiece'});

	constructor() {
		// Set the region and credentials
		this._aws.config.update({region: 'us-east-1'});
		this._aws.config.credentials = this._credentials;
	}

	get AWS() {
		return this._aws;
	}

	get credentials(){
		return this._credentials;
	}

}