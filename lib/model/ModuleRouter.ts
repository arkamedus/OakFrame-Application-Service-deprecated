import {Module} from "./module/Module";

export class ModuleRouter {

    public _modules: Module[] = [];

    registerModule(module: Module) {
        this._modules.push(module)
    }

}