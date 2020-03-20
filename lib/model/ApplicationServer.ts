import {Layer} from "./Layer";
import {IncomingMessageQueryParam, Route} from "./Route";
import {MiddlewareInterface} from "../interface/Middleware";
import {StackInterface} from "../interface/StackInterface";
import {Server, ServerResponse} from "http";

export class ApplicationServer implements StackInterface {

    stack: Array<Layer>;
    private hostname: string;
    private port: number;

    constructor() {
        this.stack = [];
        this.hostname = "localhost";
        this.port = 8080;
    }

    public register(middleware: MiddlewareInterface) {
        middleware.setup(this);
    }

    public use(route, fn?): void {
        this.stack.push(new Layer(route, fn));
    }

    public route(route: Route) {

        let url = require('url');
        let url_parts = url.parse(route.getRequest().url, true);

        route.getRequest().query = url_parts.query;
        route.getRequest().url = route.getRequest().url.split("?")[0];

        let chain: Array<Layer> = [];
        this.stack.forEach(function (layer: Layer) {
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
                        if (route.dropout) {
                            return resolve();
                        }
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

    public http_listener(request: IncomingMessageQueryParam, response: ServerResponse) {
        let self = this;

        let route = new Route();
        route.setRequest(request);
        route.setResponse(response);

        self.route(route).then(function () {
            route.getPayload().then(function (payload: string) {
                response.end(payload);
            }).catch(function (e) {
                console.trace(e);
            });
        });
    }

    public listen(port: number, https?:boolean): void {
        let self = this;
        this.port = port;
        let http = require('http'+(https?"s":''));
        let server:Server;

        if (!https) {
            server = http.createServer(function (request: IncomingMessageQueryParam, response: ServerResponse) {
                self.http_listener(request, response);
            });
        }else{
            var _fs = require('fs');
            const creds = {
                key: _fs.readFileSync('/etc/letsencrypt/live/siakit.com/privkey.pem', 'utf8'),
                cert: _fs.readFileSync('/etc/letsencrypt/live/siakit.com/fullchain.pem', 'utf8')
            };
            server = http.createServer(creds, function (request: IncomingMessageQueryParam, response: ServerResponse) {
                self.http_listener(request, response);
            });
        }

        server.listen(port, () => {
            require('dns').lookup(require('os').hostname(), function (err, address, fam) {
                self.hostname = process.env.SITE_URL||address;
                console.log(`Core HTTP${(https?"S":'')} Server is listening on ${self.hostname}:${port}`)
            });
        });
    }

    getHostname() {
        return this.hostname;
    }

    getPort() {
        return this.port;
    }

}

