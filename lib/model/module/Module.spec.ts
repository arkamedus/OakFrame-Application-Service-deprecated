///<reference path="./Module.ts"/>
import {expect} from 'chai';
import {Module} from "./Module";

describe('Module', () => {
	let module = new Module();
	it('should be created', () => {

		expect(module).not.equal(undefined);
	});
});