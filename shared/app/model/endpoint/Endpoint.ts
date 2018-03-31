export class Endpoint {
	private _provider: Provider;
	private _url:string;

	constructor(provider: Provider) {
		this._url = 'localhost';
		this._provider = provider;
	}

}