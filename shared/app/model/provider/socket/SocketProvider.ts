export class SocketProvider implements Provider {

	private _url:string;

	get(instance: any): any {
		return instance;
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

	constructor (){
		this._url = 'localhost';
	}

}