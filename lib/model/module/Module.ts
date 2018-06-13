///<reference path="../../../lib/interface/Provider.ts"/>

import {Provider} from "../../interface/Provider";

/** @class Module **/
export class Module {

	/** Fast interface to determine if module has been initialized **/
	private _initialized: boolean = false;
	private _providers: Provider[] = [];

	private _init(): any {
	}

	update(): void {

	}

	focus(): void {

	}

	defocus(): void {

	}

	render(): void {

	}

	initialized(): boolean {
		return this._initialized;
	}

	get init(): any {
		return this._init;
	}

	set init(fn) {
		this._init = fn;
	}

}