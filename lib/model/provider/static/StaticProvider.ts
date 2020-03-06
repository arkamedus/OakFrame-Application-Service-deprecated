///<reference path="../../../interface/Provider.ts"/>
import {Provider} from "../../../interface/Provider";

export class StaticProvider implements Provider {

    close(callback: any): any {
        return undefined;
    }

}