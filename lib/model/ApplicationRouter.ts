import {Module} from "./module/Module";
import {Layer} from "./Layer";
import {SubscribeInterface} from "../interface/SubscribeInterface";
import {ModuleRouter} from "./ModuleRouter";

export class ApplicationRouter implements ModuleRouter, SubscribeInterface {

    public _modules: Module[] = [];
    private stack: Array<Layer>;
    private error_stack: Array<Layer>;
    private _subscribers: any[];

    constructor() {
        this._subscribers = [];
        let app = this;
        this._modules = [];
        this.stack = [];
        this.error_stack = [];

        document.body.addEventListener('click', function (event) {
            const clickedElem: any = event.target;
            let target = clickedElem.closest("a");
            if (target && target.hasAttribute('href')) {
                app.goToPage(target.getAttribute('href'),event);
                            }
        }, false);

        window.addEventListener('popstate', function (e) {
            app.route();
        });

    }

    public goToPage(route:string, event?){
        let rel_route = route.replace(`//${window.location.hostname}:8080`, "");
        if (!window.navigator['standalone']) {
            /* iOS hides Safari address bar */
            window.history.pushState({data: "okay"}, "unknown", route);
        }
        this.route(rel_route);
        /* iOS re-orientation fix */
        if (event){
        event.preventDefault();
    }}

    public focusModule(module: Module) {
        this._modules.push(module)
    }

    public use(route, fn?): void {
        this.stack.push(new Layer(route, fn));
    }

    public error(route, fn?): void {
        this.error_stack.push(new Layer(route, fn));
    }

    public route(url?) {
        let self = this;

        let request_url = url || window.location.pathname || window.location.href;

        let chain: Array<Layer> = [];
        this.stack.forEach(function (layer: Layer) {
            let match = request_url.match(layer.route);
            if (match) {
                chain.push(layer);
            }
        });

            this._modules.forEach(function(module){
                module.defocus();
            });
            this._modules = [];

        return new Promise(function (resolve, reject) {
            function process() {
                if (chain.length > 0) {
                    let layer: Layer = chain.shift();
                    layer.fn(self).then(function () {
                        process();
                    }).catch(function (e) {
                        console.trace(e, "chain failure");
                        reject('Chain Failed');
                    });
                } else {
                    resolve();
                }
            }

            function process_error() {
                if (chain.length > 0) {
                    let layer: Layer = chain.shift();
                    layer.fn(self).then(function () {
                        process_error();
                    }).catch(function (e) {
                        console.trace(e, "chain failure");
                        reject('Chain Failed');
                    });
                } else {
                    resolve();
                }
            }

            if (chain.length > 0) {
                process();
            } else {
                chain = self.error_stack.slice(0, self.error_stack.length);
                process_error();
            }

        }).then(function () {
            self.publish('route', false);
            self._modules.forEach(function(module){
                module.focus();
            });
        });

    }

    subscribe(identifier: string, callback: any): any {
        if (!this._subscribers[identifier]) {
            this._subscribers[identifier] = [];
        }
        this._subscribers[identifier].push(callback);
    }

    publish(identifier, data?): any {
        if (this._subscribers[identifier]) {
            this._subscribers[identifier].forEach(function (subscriber) {
                subscriber(data);
            });
        }
    }

}