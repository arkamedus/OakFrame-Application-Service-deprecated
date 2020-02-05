import {Module} from "./module/Module";
import {Layer} from "./Layer";

export class Kernel {

	private _modules: Module[] = [];
	private stack:Array<Layer>;

	constructor() {
		this._modules = [];
		this.stack = [];
	}

	registerModule(module: Module) {
		this._modules.push(module)
	}

	public use(route, fn?): void {
		this.stack.push(new Layer(route, fn));
	}

	public route(url?) {

		let request_url = window.location.pathname||window.location.href;

		console.log(request_url);

		let chain: Array<Layer> = [];
		this.stack.forEach(function (layer) {
			let match = request_url.match(layer.route);
			if (match) {
				chain.push(layer);
			}
		});

		return new Promise(function (resolve, reject) {
			function process() {
				if (chain.length > 0) {
					let layer: Layer = chain.shift();
					layer.fn().then(function () {
						process();
					}).catch(function (e) {
						console.log(`CHAIN FAILED`);
						console.log(e);
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

	defineRoute(route, module){};

}