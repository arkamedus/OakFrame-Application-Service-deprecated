///<reference path="../subscribe/Subscribe.ts"/>
import {Subscribe} from "../subscribe/Subscribe";

export class Endpoint {
    private _url: string;
    private _routes: any[] = [];
    private _subscribe:Subscribe;

    constructor() {
        this._subscribe = new Subscribe();
        this._url = 'localhost';
    }

    route(request, response) {

        for (let i = 0; i < this._routes.length; i++) {
            let route = this._routes[i];
            let match = request.url.match(route.route);
            if (match) {
                request.params = match.slice(1);
                try {
                    return route.handler(request, response);
                } catch (err) {
                    console.log(err.stack);
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

    subscribe(route:string, callback:any){
        this._subscribe.subscribe(route, callback)
    }

    handle(connection){

        let endpoint = this;

        connection.send(JSON.stringify({msg: `Ahoy!`}));

        connection.on('message', function (message) {
            if (message.type === 'utf8') {
               endpoint._subscribe.publish(JSON.parse(message.utf8Data), connection);
            }
        });

        connection.on('close', function (connection) {
            // close user connection
        });
    }

}