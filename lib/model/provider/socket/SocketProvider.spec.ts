///<reference path="SocketProvider.ts"/>
import {expect} from 'chai';
import {SocketProvider} from "./SocketProvider";
import {Endpoint} from "../../endpoint/Endpoint";

describe('SocketProvider', () => {

    let socketProvider = new SocketProvider(new Endpoint());

    it('should be created', () => {
        expect(socketProvider).not.equal(undefined);
    });

    it('should close', (done) => {
        socketProvider.close(done);
    });

});