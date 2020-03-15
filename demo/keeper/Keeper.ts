///<reference path="../../lib/model/endpoint/Endpoint.ts"/>

import {SocketProvider} from "../../lib/model/provider/socket/SocketProvider";
import {Endpoint} from "../../lib/model/endpoint/Endpoint";
import {IncomingMessageQueryParam} from "../../lib/model/Route";
import {ServerResponse} from "http";

let socket = new SocketProvider(new Endpoint());

socket.listen('store', function (request:IncomingMessageQueryParam, response:ServerResponse) {
    response.end(`
    <h1>HTTPServer</h1>
    <p>Working as expected.</p>
    `);
});

socket.listen('fetch', function (request:IncomingMessageQueryParam, response:ServerResponse) {
    response.end(`
    <h1>HTTPServer</h1>
    <p>Working as expected.</p>
    `);
});
