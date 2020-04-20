import { Graph } from "../Graph";
import { GraphNode } from "../../interface/GraphNode";
import { GraphNodeHTMLElement } from "../../interface/GraphNodeHTMLElement";
/** @class LogNode **/
export declare class LogNode implements GraphNode {
    _graph: Graph;
    _inputs: GraphNode[];
    _outputs: GraphNode[];
    _value: string[];
    _name: string;
    _display: any;
    _element: GraphNodeHTMLElement;
    constructor(graph: Graph);
    attachOutput(node: GraphNode): any;
    _render(element: HTMLElement): any;
    _evaluate(log: string): void;
}
