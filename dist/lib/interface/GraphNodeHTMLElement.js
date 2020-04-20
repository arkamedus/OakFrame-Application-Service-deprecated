"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//** @class GraphNodeHTMLElement extends an HTMLElement to add data binding functionality
var GraphNodeHTMLElement = /** @class */ (function () {
    function GraphNodeHTMLElement(parent, tagName, className) {
        this._parent = parent;
        this._element = document.createElement(tagName);
        this._element.className = className;
        this._element.id = (((Math.random() * 120000) + 1) | 0) + "";
    }
    GraphNodeHTMLElement.prototype.render = function (element) {
    };
    Object.defineProperty(GraphNodeHTMLElement.prototype, "element", {
        /*set innerHTML(html: string) {
            this._element.innerHTML = html;
                if (document.getElementById('activate')) {
                    let me = this;
                    document.getElementById('activate').onclick = function () {
                        me._parent._evaluate({});
                    };
                    document.getElementById('activate').id = "";
                }
    
                if (document.getElementById('text')) {
                    let text = this._parent;
                    document.getElementById('text').onkeyup = function () {
                        let input = <HTMLInputElement>this;
                        text._value = input.value;
                        input.value = input.value;
                        console.log('updating value', input.value, text);
                        //text._evaluate();
                    };
                    document.getElementById('text').id = "";
                }
    
    
        }*/
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    return GraphNodeHTMLElement;
}());
exports.GraphNodeHTMLElement = GraphNodeHTMLElement;
