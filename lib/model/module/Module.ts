import {Provider} from "../../interface/Provider";
import {ApplicationRouter} from "../ApplicationRouter";

export class Module {

	/** Fast interface to determine if module has been initialized **/
	private _initialized: boolean = false;

	public init = ():any => {};

	public update = ():any => {};

	public focus = ():any => {};

	public defocus = ():any => {};

	public render = ():any => {};

	isInitialized(): boolean {
		return this._initialized;
	}

	public use = (app?:ApplicationRouter):any => {};

}