"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Module = /** @class */ (function () {
    function Module() {
        /** Fast interface to determine if module has been initialized **/
        this._initialized = false;
        this.init = function () { };
        this.update = function () { };
        this.focus = function () { };
        this.defocus = function () { };
        this.render = function () { };
        this.use = function (route, app) { };
    }
    Module.prototype.isInitialized = function () {
        return this._initialized;
    };
    return Module;
}());
exports.Module = Module;
