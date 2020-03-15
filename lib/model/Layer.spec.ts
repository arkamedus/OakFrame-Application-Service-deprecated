import {expect} from 'chai';
import {Layer} from "./Layer";

describe('Layer', () => {

    let layer = new Layer('a', function () {
        return new Promise(function (resolve, reject) {
            resolve('This is a test phrase');
        })
    });

    it('should be created', () => {

        expect(layer).not.equal(undefined);
        expect(layer.route.toString()).equal(/^a$/.toString());
        expect(layer.fn).not.equal(undefined);

    });

    it('return some value', (done) => {
        layer.fn().then((data) => {
            expect(data).equal('This is a test phrase');
            done();
        });
    });

});