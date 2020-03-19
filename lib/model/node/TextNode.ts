import {Graph} from "../Graph";
import {GraphNode} from "../../interface/GraphNode";
import {GraphNodeHTMLElement} from "../../interface/GraphNodeHTMLElement";

/** @class TextNode **/
export class TextNode implements GraphNode {
	_graph: Graph;
	_inputs: GraphNode[] = [];
	_outputs: GraphNode[] = [];
	_value: string = "default";
	_name: string = "Text";
	_display: any;
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
		this._element.element.innerHTML = `<p>${this._name}<br /><input id="${id}" type="text" value="${this._value}"/></p>`;
		console.log(element);
		console.log(this._name);
		element.appendChild(this._element.element);

		let input = <HTMLInputElement>document.getElementById(id);
		input.onkeyup = function(){
			self._value = input.value;
		}
	}

	_evaluate(input:any): void {
		console.log('text node evaluate', this._value);
		for (let i = 0; i < this._outputs.length; i++) {
			this._outputs[i]._evaluate(this._value);
		}
	}

}