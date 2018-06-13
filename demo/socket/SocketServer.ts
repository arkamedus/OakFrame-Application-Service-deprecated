///<reference path="../../lib/model/endpoint/Endpoint.ts"/>

import {SocketProvider} from "../../lib/model/provider/socket/SocketProvider";
import {Endpoint} from "../../lib/model/endpoint/Endpoint";

let socket = new SocketProvider(new Endpoint());

socket.define('/', function (request, response) {
    response.end(`
    <h1>HTTPServer</h1>
    <p>Working as expected.</p>
    `);
});
