import {Subscriber} from "./Subscriber";

export class Subscribe {

	_subscribers:any[];

	constructor(){
		this._subscribers = [];
	}

	packet(identifier):any{
		return this._subscribers[identifier];
	}
	subscribe(slug, callback):any{
		this._subscribers[slug] = callback;
	}
	publish(packet):any{
		for (let property in packet) {
			if (this._subscribers[property]) {
				this._subscribers[property](packet);
			}
		}
	}
}