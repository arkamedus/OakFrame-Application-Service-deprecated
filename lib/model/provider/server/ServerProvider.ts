///<reference path="../../../interface/Provider.ts"/>
///<reference path="../../../interface/Rest.ts"/>

import {Endpoint} from "../../endpoint/Endpoint";
import {Provider} from "../../../interface/Provider";
export class ServerProvider implements Provider, Rest {

    private _url: string;
    private http;
    private port: number;
    private server;
    private _endpoint: Endpoint;

    constructor(endpoint: Endpoint) {

        this.http = require('http');
        this.port = 3000;
        this._endpoint = endpoint;

        const requestHandler = (request, response) => {
            this.route(request, response);
        };

        this.server = this.http.createServer(requestHandler);

        this.server.listen(this.port, (err:any) => {
            if (err) {
                return console.log(err);
            }

            console.log(`HTTPServer is listening on port ${this.port}`);
        });
    }

    route(request, response): any {
        this._endpoint.route(request, response);
    }

    define(route, response): any {
        this._endpoint.define(route, response);
    }

    close(callback): any {
        if (this.server) {
            this.server.close(function () {
                callback();
            });
        }
    }

}