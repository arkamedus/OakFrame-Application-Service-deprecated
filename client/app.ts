import {Kernel} from "../shared/app/model/Kernel";
import {Module} from "../shared/app/model/module/Module";
import {Entry} from "./app/controller/Entry/Entry";

let kernel = new Kernel();
let entry = <Module>new Entry();

entry.init = function() {
	console.log('entry.init()');
	console.info('it works! :)');
};

kernel.registerModule(entry);
entry.init();
