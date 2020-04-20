import { Graph } from "../Graph";
import { GraphNode } from "../../interface/GraphNode";
import { GraphNodeHTMLElement } from "../../interface/GraphNodeHTMLElement";
/** @class ButtonNode **/
export declare class ButtonNode implements GraphNode {
    _value: any;
    _name: string;
    _display: any;
    _graph: Graph;
    _inputs: GraphNode[];
    _outputs: GraphNode[];
    _element: GraphNodeHTMLElement;
    constructor(graph: Graph);
    attachOutput(node: GraphNode): any;
    _render(element: HTMLElement): any;
    _evaluate(): void;
}
