import {Layer} from "./Layer";
import {Route} from "./Route";
import {MiddlewareInterface} from "../interface/Middleware";
import {StackInterface} from "../interface/StackInterface";

export class Core implements StackInterface {

    stack: Array<Layer>;

    constructor() {
        this.stack = [];
    }

    public register(middleware: MiddlewareInterface) {
        middleware.setup(this);
    }

    public use(route, fn?): void {
        this.stack.push(new Layer(route, fn));
    }

    public route(route: Route) {

        var url = require('url');
        var url_parts = url.parse(route.getRequest().url, true);

        route.getRequest().query = url_parts.query;
        route.getRequest().url = route.getRequest().url.split("?")[0];

        let chain: Array<Layer> = [];
        this.stack.forEach(function (layer) {
            let match = route.getRequest().url.match(layer.route);
            if (match) {
                route.getRequest().params = match.slice(1).map(function (slug) {
                    return slug || '/';
                });
                chain.push(layer);
            }
        });

        return new Promise(function (resolve, reject) {
            function process() {
                if (chain.length > 0) {
                    let layer: Layer = chain.shift();
                    layer.fn(route).then(function () {
                        process();
                    }).catch(function (e) {
                        route.getResponse().end(`CHAIN FAILED`);
                        console.trace(e, "chain failure");
                        reject('Chain Failed');
                    });
                } else {
                    resolve();
                }
            }

            process();
        });

    }

    public http_listener(request, response) {
        let self = this;

        let route = new Route();
        route.setRequest(request);
        route.setResponse(response);

        self.route(route).then(function () {
            route.getPayload().then(function (payload) {
                response.end(payload);
            }).catch(function (e) {
                console.trace(e);
            });
        });
    }

    public listen(port: number): void {

        let http = require('http');
        let self = this;
        let server = http.createServer(function (request, response) {
            self.http_listener(request, response);
        });

        server.listen(port, (err) => {
            if (err) {
                return console.error(err)
            }
            console.log(`Core HTTP Server is listening on port ${port}`)
        });
    }

}

