"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphNodeHTMLElement_1 = require("../../interface/GraphNodeHTMLElement");
/** @class LogNode **/
var LogNode = /** @class */ (function () {
    function LogNode(graph) {
        this._inputs = [];
        this._outputs = [];
        this._name = "Log";
        this._element = new GraphNodeHTMLElement_1.GraphNodeHTMLElement(this, 'div', 'node');
        this._value = [];
        this._graph = graph;
    }
    LogNode.prototype.attachOutput = function (node) {
        this._outputs.push(node);
    };
    LogNode.prototype._render = function (element) {
        var str = '<p>Log</p><br />';
        for (var i = 0; i < this._value.length; i++) {
            str = str + this._value[i] + '<br>';
        }
        this._element.element.innerHTML = str;
        console.log(element);
        console.log(this._name);
        element.appendChild(this._element.element);
    };
    LogNode.prototype._evaluate = function (log) {
        console.log('log node evaluate', this._value, log);
        this._value.push(log);
    };
    return LogNode;
}());
exports.LogNode = LogNode;
