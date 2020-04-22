///<reference path="../subscribe/Subscribe.ts"/>
import {Subscribe} from "../subscribe/Subscribe";
import {IncomingMessageQueryParam} from "../Route";
import {ServerResponse} from "http";

export class Endpoint {
    private _url: string;
    private _routes: any[] = [];
    private _subscribe: Subscribe;
    private _clients: any[] = [];

    constructor() {
        this._subscribe = new Subscribe();
        this._url = 'localhost';
    }

    route(request: IncomingMessageQueryParam, response: ServerResponse) {

        for (let i = 0; i < this._routes.length; i++) {
            let route = this._routes[i];
            let match = request.url.match(route.route);
            if (match) {
                request.params = match.slice(1);
                try {
                    return route.handler(request, response);
                } catch (err) {
                    return response.end(JSON.stringify({ // 500
                        err: true,
                        url: request.url,
                        message: `No matching Endpoints found`,
                        headers: request.headers
                    }));
                }
            }
        }

        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ // 404
            err: true,
            url: request.url,
            message: `No routes defined for Endpoint`,
            headers: request.headers
        }));
    }

    define(route: any, handler: any) {

        if (!(route instanceof RegExp)) {
            route = new RegExp("^" + route + "$")
        }
        this._routes.push({route: route, handler: handler});
    }

    subscribe(route: string, callback: any) {
        this._subscribe.subscribe(route, callback)
    }

    handle(connection) {

        let endpoint = this;

        endpoint._clients.push(connection);

        connection.on('message', function (message) {
            if (message.type === 'utf8') {
                let json = JSON.parse(message.utf8Data);
                for (var key in json) {
                    if (json.hasOwnProperty(key)) {
                        let data = {data: json[key], connection: connection};
                        endpoint._subscribe.publish(key, data);
                    }
                }
            }
        });
    }

    getClients() {
        return this._clients;
    }

    removeClient() {
        let idx = -1;
        this.getClients().forEach(function (connection, i) {
            if (!connection.connected) {
                idx = i;
            }
        });
        if (idx >= 0) {
            this._clients.splice(idx, 1);
        }
    }

}