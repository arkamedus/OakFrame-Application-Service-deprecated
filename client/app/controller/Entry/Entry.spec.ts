///<reference path="./Entry.ts"/>

import { expect } from 'chai';
import {Entry} from "./Entry";

describe('Entry', () => {

	let endpoint = new Entry();

	it('should be created', () => {

		expect(endpoint).not.equal(undefined);
	});

});