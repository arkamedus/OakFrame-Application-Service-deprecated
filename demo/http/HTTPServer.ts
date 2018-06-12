///<reference path="../../shared/app/model/endpoint/Endpoint.ts"/>

import {ServerProvider} from "../../shared/app/model/provider/server/ServerProvider";
import {Endpoint} from "../../shared/app/model/endpoint/Endpoint";

let http = new ServerProvider(new Endpoint());

http.define('/', function (response) {
    response.end(`
    <h1>HTTPServer</h1>
    <p>Working as expected.</p>
    `);
});

http.define('/app', function (response) {
    response.end(`
    <h1>HTTPServer : App</h1>
    <p>Still working as expected.</p>
    `);
});