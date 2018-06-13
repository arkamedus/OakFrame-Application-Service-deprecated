"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @class Module **/
class Module {
    constructor() {
        /** Fast interface to determine if module has been initialized **/
        this._initialized = false;
    }
    _init() {
    }
    update() {
    }
    focus() {
    }
    defocus() {
    }
    render() {
    }
    initialized() {
        return this._initialized;
    }
    get init() {
        return this._init;
    }
    set init(fn) {
        this._init = fn;
    }
}
exports.Module = Module;
