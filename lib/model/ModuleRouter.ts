import {Module} from "./module/Module";

export class ModuleRouter {

    public _modules: Module[] = [];

    focusModule(module: Module) {
        this._modules.push(module)
    }

}