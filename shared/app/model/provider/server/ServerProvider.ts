import {Endpoint} from "../../endpoint/Endpoint";
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

        this.server.listen(this.port, (err) => {
            if (err) {
                return console.log(err)
            }

            console.log(`HTTPServer is listening on port ${this.port}`)
        })
    }

    get(instance: any): any {
        return instance;
    }

    route(request, response): any {
        this._endpoint.route(request, response);
    }

    define(route, response): any {
        this._endpoint.define(route, response);
    }

    then(): any {
        return undefined;
    }

    error(): any {
        return undefined;
    }

    end(): any {
        return undefined;
    }

    close(callback): any {
        if (this.server) {
            this.server.close(function () {
                callback();
            });
        }
    }

}