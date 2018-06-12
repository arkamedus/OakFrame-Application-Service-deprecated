///<reference path="ServerProvider.ts"/>
import {expect} from 'chai';
import {ServerProvider} from "./ServerProvider";
import {Endpoint} from "../../endpoint/Endpoint";

describe('ServerProvider', () => {

    let serverProvider = new ServerProvider(new Endpoint());
    const request = require('request');

    it('should be created', () => {
        expect(serverProvider).not.equal(undefined);
    });

    it('should have no available routes', (done) => {

        request('http://localhost:3000', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            expect(body.err).equal(true);
            done();
        });
    });

    it('should route a root request', (done) => {
        serverProvider.define('/', function (response) {
            response.end(JSON.stringify({err: false, response: response.url}));
        });

        request('http://localhost:3000/', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            expect(body.err).equal(false);
            done();
        });
    });

    it('should close', (done) => {
        serverProvider.close(done);
    });

});