"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModuleRouter = /** @class */ (function () {
    function ModuleRouter() {
        this._modules = [];
    }
    ModuleRouter.prototype.focusModule = function (module) {
        this._modules.push(module);
    };
    return ModuleRouter;
}());
exports.ModuleRouter = ModuleRouter;
