"use strict";
///<reference path="../interface/GraphEvent.ts"/>
///<reference path="../interface/GraphNode.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = /** @class */ (function () {
    function Graph() {
        this._nodes = [];
    }
    Graph.prototype.attachNode = function (node) {
        this._nodes.push(node);
    };
    Graph.prototype.render = function (element) {
        this._nodes.forEach(function (node) {
            node._render(element);
        });
        var isMouseDown, initX, initY, clickX, clickY, height = 0, width = 0, draggingElem;
        document.body.addEventListener('mousedown', function (e) {
            var elem = e.srcElement || e.target;
            draggingElem = null;
            if (elem.className.indexOf("node") !== -1) {
                draggingElem = elem;
            }
            else {
                if (e.path) {
                    e.path.forEach(function (el) {
                        if (!draggingElem) {
                            if (!el || !el.className) {
                                return;
                            }
                            if (el.className.indexOf("node") !== -1) {
                                draggingElem = el;
                            }
                        }
                    });
                }
            }
            if (!draggingElem) {
                return;
            }
            isMouseDown = true;
            document.body.classList.add('no-select');
            height = draggingElem.offsetHeight;
            width = draggingElem.offsetWidth;
        });
        document.addEventListener('mousemove', function (e) {
            if (isMouseDown && draggingElem) {
                if (!initX && !initY && !clickX && !clickY) {
                    clickX = e.pageX;
                    clickY = e.pageY;
                    initX = draggingElem.offsetLeft || 0;
                    initY = draggingElem.offsetTop || 0;
                }
                var cx = (e.pageX - clickX) + initX;
                var cy = ((((e.pageY) - clickY)) + initY);
                if (cx < 0) {
                    cx = 0;
                }
                if (cy < 0) {
                    cy = 0;
                }
                //if (window.innerWidth - e.clientX + initX < width) {
                //cx = window.innerWidth - width;
                //}
                //if (e.clientY > window.innerHeight - height+ initY) {
                //cy = window.innerHeight - height;
                //}
                draggingElem.style.left = cx + 'px';
                draggingElem.style.top = cy + 'px';
            }
        });
        document.addEventListener('mouseup', function () {
            isMouseDown = false;
            draggingElem = null;
            initX = null;
            initY = null;
            clickX = null;
            clickY = null;
            document.body.classList.remove('no-select');
        });
    };
    Object.defineProperty(Graph.prototype, "onComplete", {
        get: function () {
            return this._oncomplete;
        },
        set: function (evt) {
            this._oncomplete = evt;
        },
        enumerable: true,
        configurable: true
    });
    Graph.prototype._oncomplete = function () {
    };
    return Graph;
}());
exports.Graph = Graph;
