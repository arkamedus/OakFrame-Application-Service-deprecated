import {Kernel} from "../shared/app/model/Kernel";
import {Module} from "../shared/app/model/module/Module";
import {Entry} from "./app/controller/Entry/Entry";
import {Landing} from "./app/view/Landing";
import {Socket} from "../shared/app/model/socket/Socket";

let kernel = <Kernel>new Kernel();
let entry = <Module>new Entry();

entry.init = function() {
	console.log('entry.init()');
	console.info('it works! :)');
};

kernel.registerModule(entry);
entry.init();

let landing = new Landing();

document.body.innerHTML = landing.getContents();

//let socket = <Socket>new Socket();

//socket.connect('wss://a3gd91vdmo74np.iot.us-east-1.amazonaws.com');
