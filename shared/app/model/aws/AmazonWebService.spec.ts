///<reference path="./AmazonWebService.ts"/>

import {expect} from 'chai';
import {AmazonWebService} from "./AmazonWebService";

describe('AmazonWebService', () => {
	let aws = new AmazonWebService();

	it('should be created', () => {

		expect(aws).not.equal(undefined);
	});

});