///<reference path="../../lib/model/endpoint/Endpoint.ts"/>

import {IncomingMessageQueryParam} from "../../lib/model/Route";
import {ServerResponse} from "http";
import {ApplicationServer} from "../../lib/model/ApplicationServer";

let http = new ApplicationServer();

http.use('/', function (request:IncomingMessageQueryParam, response:ServerResponse) {
    response.end(`
    <h1>HTTPServer</h1>
    <p>Working as expected.</p>
    `);
});

http.use('/([a-zA-Z0-9]+)', function (request:IncomingMessageQueryParam, response:ServerResponse) {
    response.end(`
    <h1>Reply: ${request.params[0]}</h1>
    <p>Still working as expected.</p>
    `);
});
