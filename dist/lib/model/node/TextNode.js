"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphNodeHTMLElement_1 = require("../../interface/GraphNodeHTMLElement");
/** @class TextNode **/
var TextNode = /** @class */ (function () {
    function TextNode(graph) {
        this._inputs = [];
        this._outputs = [];
        this._value = "default";
        this._name = "Text";
        this._element = new GraphNodeHTMLElement_1.GraphNodeHTMLElement(this, 'div', 'node');
        this._graph = graph;
    }
    TextNode.prototype.attachOutput = function (node) {
        this._outputs.push(node);
    };
    TextNode.prototype._render = function (element) {
        var self = this;
        var id = (((Math.random() * 120000) + 1) | 0) + "";
        this._element.element.innerHTML = "<p>" + this._name + "<br /><input id=\"" + id + "\" type=\"text\" value=\"" + this._value + "\"/></p>";
        console.log(element);
        console.log(this._name);
        element.appendChild(this._element.element);
        var input = document.getElementById(id);
        input.onkeyup = function () {
            self._value = input.value;
        };
    };
    TextNode.prototype._evaluate = function (input) {
        console.log('text node evaluate', this._value);
        for (var i = 0; i < this._outputs.length; i++) {
            this._outputs[i]._evaluate(this._value);
        }
    };
    return TextNode;
}());
exports.TextNode = TextNode;
