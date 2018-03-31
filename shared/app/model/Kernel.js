"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Kernel {
    constructor() {
        this._modules = [];
    }
    registerModule(module) {
        this._modules.push(module);
    }
}
exports.Kernel = Kernel;
