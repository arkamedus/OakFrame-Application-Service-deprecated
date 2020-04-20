"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field = /** @class */ (function () {
    function Field(type, value) {
        this._type = type;
        if (value) {
            this._value = value;
        }
        else {
            this._value = null;
        }
    }
    return Field;
}());
exports.Field = Field;
