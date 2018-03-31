export class ServerProvider implements Provider, Rest {

	private _url:string;

	constructor (url:string){
		this._url = url;
	}

	get(instance: any): any {
		return instance;
	}

	route(item: any): any {
		return item;
	}

	then(): any {
		return undefined;
	}

	error(): any {
		return undefined;
	}

	end(): any {
		return undefined;
	}

}