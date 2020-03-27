///<reference path="./EntryController.ts"/>

import { expect } from 'chai';
import {EntryController} from "./EntryController";

describe('Entry', () => {

	let endpoint = new EntryController();

	it('should be created', () => {

		expect(endpoint).not.equal(undefined);
	});

});