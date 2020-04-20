import { GraphNode } from "./GraphNode";
export declare class GraphNodeHTMLElement {
    private readonly _parent;
    private readonly _element;
    constructor(parent: GraphNode, tagName: string, className: string);
    render(element: HTMLElement): any;
    get element(): HTMLElement;
}
