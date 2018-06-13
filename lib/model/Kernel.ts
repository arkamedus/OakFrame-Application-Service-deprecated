/** @class Kernel **/
import {Module} from "./module/Module";

export class Kernel {

	private _modules: Module[] = [];

	registerModule(module: Module) {
		this._modules.push(module)
	}

}