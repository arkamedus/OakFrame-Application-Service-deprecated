import {Module} from "./module/Module";
import {Layer} from "./Layer";
import {Subscribe} from "./subscribe/Subscribe";

export class Kernel extends Subscribe {

	private _modules: Module[] = [];
	private stack:Array<Layer>;
	private error_stack:Array<Layer>;

	constructor() {
		super();
		this._modules = [];
		this.stack = [];
		this.error_stack = [];
	}

	registerModule(module: Module) {
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

		let request_url = url||window.location.pathname||window.location.href;

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
			function process_error() {
				if (chain.length > 0) {
					let layer: Layer = chain.shift();
					layer.fn().then(function () {
						process_error();
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
			if (chain.length > 0) {
				process();
			}else{
				chain = self.error_stack.slice(0,self.error_stack.length);
				process_error();
			}

		}).then(function(){
			self.publish('route',false);
		});

	}

}