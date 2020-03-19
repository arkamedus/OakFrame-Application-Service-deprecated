import {Graph} from "../Graph";
import {GraphNode} from "../../interface/GraphNode";
import {GraphNodeHTMLElement} from "../../interface/GraphNodeHTMLElement";

/** @class ButtonNode **/
export class ButtonNode implements GraphNode {
	_value: any;
	_name: string = "Button";
	_display: any;
	_graph: Graph;
	_inputs: GraphNode[] = [];
	_outputs: GraphNode[] = [];
	_element: GraphNodeHTMLElement = new GraphNodeHTMLElement(this, 'div', 'node');

	constructor(graph: Graph) {
		this._graph = graph;
	}

	attachOutput(node: GraphNode): any {
		this._outputs.push(node);
	}

	_render(element: HTMLElement): any {
		let self = this;
		let id = (((Math.random()*120000)+1)|0)+"";
		//this._element.element.appendChild(info.element);
		//this._element.element.appendChild(action.element);
		this._element.element.innerHTML = `<p>${this._name}<br /><button id="${id}">Activate</button></p>`;

		console.log(element);
		console.log(this._name);
		element.appendChild(this._element.element);

		document.getElementById(id).onclick = function(){
			self._evaluate();
		}

	}

	_evaluate(): void {
		console.log('button node evaluate');
		for (let i = 0; i < this._outputs.length; i++) {
			this._outputs[i]._evaluate({});
		}
		this._graph.onComplete();
	}

}