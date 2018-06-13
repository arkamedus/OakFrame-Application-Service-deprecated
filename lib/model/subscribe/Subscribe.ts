import {Subscriber} from "./Subscriber";

export class Subscribe {
	_subscribers:Subscriber[];
	packet(identifier):any{
		return this._subscribers[identifier];
	}
	subscribe(slug, callback):any{
		this._subscribers[slug] = callback;
	}
	publish(slug, ):any{

	}
}