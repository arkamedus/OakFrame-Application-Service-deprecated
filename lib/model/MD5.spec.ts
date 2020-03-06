import {expect} from 'chai';
import {MD5} from "./MD5";

describe('MD5', () => {

    it('should return validated MD5 results', () => {

        expect(MD5('a')).equal('0cc175b9c0f1b6a831c399e269772661');
        expect(MD5('aaabbb')).equal('6547436690a26a399603a7096e876a2d');
        expect(MD5('0cc175b9c0f1b6a831c399e269772661')).equal('d7afde3e7059cd0a0fe09eec4b0008cd');
        expect(MD5('d7afde3e7059cd0a0fe09eec4b0008cd0cc175b9c0f1b6a831c399e269772661')).equal('5a7211173c263326191faf16c7cb542a');

    });

});