"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layer = /** @class */ (function () {
    function Layer(route, fn) {
        if (!(route instanceof RegExp)) {
            route = new RegExp("^" + route + "$");
        }
        this.route = route;
        this.fn = fn;
    }
    return Layer;
}());
exports.Layer = Layer;
