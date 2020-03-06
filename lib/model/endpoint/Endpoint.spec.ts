///<reference path="./Endpoint.ts"/>
///<reference path="../provider/static/StaticProvider.ts"/>

import {expect} from 'chai';
import {Endpoint} from "./Endpoint";
import {StaticProvider} from "../provider/static/StaticProvider";

describe('Endpoint', () => {

    let endpoint = new Endpoint();

    it('should be created', () => {
        expect(endpoint).not.equal(undefined);
    });

});