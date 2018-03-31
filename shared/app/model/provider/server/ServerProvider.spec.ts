///<reference path="ServerProvider.ts"/>
import { expect } from 'chai';
import {ServerProvider} from "./ServerProvider";

describe('ServerProvider', () => {

	let serverProvider= new ServerProvider('localhost');

	it('should be created', () => {
		expect(serverProvider).not.equal(undefined);
	});

});