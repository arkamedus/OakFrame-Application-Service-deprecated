import {Kernel} from "../shared/app/model/Kernel";
import {Module} from "../shared/app/model/module/Module";
import {Entry} from "./app/controller/Entry/Entry";
import {Socket} from "../shared/app/model/socket/Socket";

let kernel = new Kernel();
let entry = <Module>new Entry();

entry.init = function() {
	console.log('entry.init()');
	console.info('it works! :)');
};

kernel.registerModule(entry);
entry.init();

let socket = <Socket>new Socket();

socket.connect('wss://a3gd91vdmo74np.iot.us-east-1.amazonaws.com');
