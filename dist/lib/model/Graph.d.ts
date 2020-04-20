/// <reference path="../interface/GraphEvent.d.ts" />
/// <reference path="../interface/GraphNode.d.ts" />
import { GraphNode } from "../interface/GraphNode";
export declare class Graph implements GraphEvent {
    private _nodes;
    constructor();
    attachNode(node: GraphNode): void;
    render(element: HTMLElement): void;
    get onComplete(): any;
    set onComplete(evt: any);
    _oncomplete(): any;
}
