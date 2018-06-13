///<reference path="SocketProvider.ts"/>
import {expect} from 'chai';
import {SocketProvider} from "./SocketProvider";

describe('SocketProvider', () => {

    let socketProvider = new SocketProvider();

    it('should be created', () => {
        expect(socketProvider).not.equal(undefined);
    });

});