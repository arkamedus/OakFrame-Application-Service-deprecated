import {expect} from 'chai';
import {Subscribe} from "./Subscribe";

describe('Subscribe', () => {

    let broadcaster = new Subscribe();
    let inc: number = 6;

    it('should be created', () => {
        expect(broadcaster).not.equal(undefined);
    });

    it('return no listeners', () => {
        expect(broadcaster.getSubscribers('').length).equal(0);
    });

    it('register listeners', () => {
        broadcaster.subscribe('add', function () {
            inc++;
        });
        broadcaster.subscribe('msg', function () {});
        expect(broadcaster.getSubscribers('add').length).equal(1);
        expect(broadcaster.getSubscribers('msg').length).equal(1);
    });

    it('publish message', () => {
        broadcaster.publish('add');
        expect(inc).equal(7);
    });

});