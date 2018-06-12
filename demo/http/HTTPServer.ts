///<reference path="../../shared/app/model/endpoint/Endpoint.ts"/>

import {ServerProvider} from "../../shared/app/model/provider/server/ServerProvider";
import {Endpoint} from "../../shared/app/model/endpoint/Endpoint";

let http = new ServerProvider(new Endpoint());

http.define('/', function (request, response) {
    response.end(`
    <h1>HTTPServer</h1>
    <p>Working as expected.</p>
    `);
});

http.define('/([a-zA-Z0-9]+)', function (request, response) {
    response.end(`
    <h1>Reply: ${request.params[0]}</h1>
    <p>Still working as expected.</p>
    `);
});