import { Graph } from "../Graph";
import { GraphNode } from "../../interface/GraphNode";
import { GraphNodeHTMLElement } from "../../interface/GraphNodeHTMLElement";
/** @class TextNode **/
export declare class TextNode implements GraphNode {
    _graph: Graph;
    _inputs: GraphNode[];
    _outputs: GraphNode[];
    _value: string;
    _name: string;
    _display: any;
    _element: GraphNodeHTMLElement;
    constructor(graph: Graph);
    attachOutput(node: GraphNode): any;
    _render(element: HTMLElement): any;
    _evaluate(input: any): void;
}
