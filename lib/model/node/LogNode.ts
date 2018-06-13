import {Graph} from "../Graph";
import {GraphNode} from "../../interface/GraphNode";
import {GraphNodeHTMLElement} from "../../interface/GraphNodeHTMLElement";

/** @class LogNode **/
class LogNode implements GraphNode {
	_graph: Graph;
	_inputs: GraphNode[] = [];
	_outputs: GraphNode[] = [];
	_value: string[];
	_name: string = "Log";
	_display: any;
	_element: GraphNodeHTMLElement = new GraphNodeHTMLElement(this, 'div', 'node');

	constructor(graph: Graph) {
		this._value = [];
		this._graph = graph;
	}

	attachOutput(node: GraphNode): any {
		this._outputs.push(node);
	}

	_render(element: HTMLElement): any {
		let str = '<p>Log</p><br />';
		for (let i = 0; i < this._value.length; i++) {
			str = str + this._value[i] + '<br>';
		}
		this._element.innerHTML = str;
		console.log(element);
		console.log(this._name);
		element.appendChild(this._element.element);


	}

	_evaluate(log: string): void {
		console.log('log node evaluate', this._value, log);
		this._value.push(<string>log);
	}


}