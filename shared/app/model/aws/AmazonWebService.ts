import {SharedIniFileCredentials} from "aws-sdk";

export class AmazonWebService {

	private _aws = require('aws-sdk');

	constructor() {
		// Set the region and credentials
		this._aws.config.update({region: 'us-east-1'});
		let credentials: SharedIniFileCredentials = new this._aws.SharedIniFileCredentials({profile: 'keypiece'});
		this._aws.config.credentials = credentials;
	}

	get AWS() {
		return this._aws;
	}

}