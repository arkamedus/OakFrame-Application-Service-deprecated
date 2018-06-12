///<reference path="StaticProvider.ts"/>

import {expect} from 'chai';
import {StaticProvider} from "./StaticProvider";

describe('StaticProvider', () => {

    let staticProvider = new StaticProvider();

    it('should be created', () => {
        expect(staticProvider).not.equal(undefined);
    });

});