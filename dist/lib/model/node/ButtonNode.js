"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphNodeHTMLElement_1 = require("../../interface/GraphNodeHTMLElement");
/** @class ButtonNode **/
var ButtonNode = /** @class */ (function () {
    function ButtonNode(graph) {
        this._name = "Button";
        this._inputs = [];
        this._outputs = [];
        this._element = new GraphNodeHTMLElement_1.GraphNodeHTMLElement(this, 'div', 'node');
        this._graph = graph;
    }
    ButtonNode.prototype.attachOutput = function (node) {
        this._outputs.push(node);
    };
    ButtonNode.prototype._render = function (element) {
        var self = this;
        var id = (((Math.random() * 120000) + 1) | 0) + "";
        //this._element.element.appendChild(info.element);
        //this._element.element.appendChild(action.element);
        this._element.element.innerHTML = "<p>" + this._name + "<br /><button id=\"" + id + "\">Activate</button></p>";
        console.log(element);
        console.log(this._name);
        element.appendChild(this._element.element);
        document.getElementById(id).onclick = function () {
            self._evaluate();
        };
    };
    ButtonNode.prototype._evaluate = function () {
        console.log('button node evaluate');
        for (var i = 0; i < this._outputs.length; i++) {
            this._outputs[i]._evaluate({});
        }
        this._graph.onComplete();
    };
    return ButtonNode;
}());
exports.ButtonNode = ButtonNode;
