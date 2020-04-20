"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphNodeHTMLElement_1 = require("../../interface/GraphNodeHTMLElement");
var AlertNode = /** @class */ (function () {
    function AlertNode(graph) {
        this._inputs = [];
        this._outputs = [];
        this._name = "Alert";
        this._element = new GraphNodeHTMLElement_1.GraphNodeHTMLElement(this, 'div', 'node');
        this._graph = graph;
    }
    AlertNode.prototype.attachOutput = function (node) {
        this._outputs.push(node);
    };
    AlertNode.prototype._render = function (element) {
        this._element.element.innerHTML = this._name;
        console.log(element);
        console.log(this._name);
        element.appendChild(this._element.element);
    };
    AlertNode.prototype._evaluate = function (input) {
        console.log('FINISHED', input);
        alert(input);
        this._graph.onComplete();
    };
    return AlertNode;
}());
exports.AlertNode = AlertNode;
