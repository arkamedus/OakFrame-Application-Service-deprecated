///<reference path="../interface/GraphEvent.ts"/>
///<reference path="../interface/GraphNode.ts"/>

import {GraphNode} from "../interface/GraphNode";

export class Graph implements GraphEvent {

	private _nodes: Array<GraphNode>;

	constructor() {
		this._nodes = [];
	}

	attachNode(node: GraphNode): void {
		this._nodes.push(node);
	}

	render(element: HTMLElement) {
		console.log('rendering', element);
		this._nodes.forEach(function (node) {
			node._render(element);
		})
	}

	get onComplete(): any {
		return this._oncomplete;
	}

	set onComplete(evt) {
		this._oncomplete = evt;
	}

	_oncomplete():any {

	}

}