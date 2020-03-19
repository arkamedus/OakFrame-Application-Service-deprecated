/** @class AlertNode **/
import {GraphNode} from "../../interface/GraphNode";
import {Graph} from "../Graph";
import {GraphNodeHTMLElement} from "../../interface/GraphNodeHTMLElement";

export class AlertNode implements GraphNode {
	_value: any;
	_graph: Graph;
	_inputs: GraphNode[] = [];
	_outputs: GraphNode[] = [];
	_name: string = "Alert";
	_display: any;
	_element: GraphNodeHTMLElement = new GraphNodeHTMLElement(this, 'div', 'node');

	constructor(graph: Graph) {
		this._graph = graph;
	}

	attachOutput(node: GraphNode): void {
		this._outputs.push(node);
	}

	_render(element: HTMLElement): void {
		this._element.element.innerHTML = this._name;
		console.log(element);
		console.log(this._name);
		element.appendChild(this._element.element);

	}

	_evaluate(input: string): void {
		console.log('FINISHED', input);
		alert(input);
		this._graph.onComplete();
	}

}