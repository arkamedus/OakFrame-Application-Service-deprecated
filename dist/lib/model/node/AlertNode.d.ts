/** @class AlertNode **/
import { GraphNode } from "../../interface/GraphNode";
import { Graph } from "../Graph";
import { GraphNodeHTMLElement } from "../../interface/GraphNodeHTMLElement";
export declare class AlertNode implements GraphNode {
    _value: any;
    _graph: Graph;
    _inputs: GraphNode[];
    _outputs: GraphNode[];
    _name: string;
    _display: any;
    _element: GraphNodeHTMLElement;
    constructor(graph: Graph);
    attachOutput(node: GraphNode): void;
    _render(element: HTMLElement): void;
    _evaluate(input: string): void;
}
