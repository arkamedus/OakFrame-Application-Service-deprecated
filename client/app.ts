///<reference path="../lib/model/Kernel.ts"/>
///<reference path="../lib/model/module/Module.ts"/>
///<reference path="../lib/model/socket/Socket.ts"/>

import {Kernel} from "../lib/model/Kernel";
import {Module} from "../lib/model/module/Module";
import {Entry} from "./app/controller/Entry/Entry";
import {Landing} from "./app/view/Landing";
import {Socket} from "../lib/model/socket/Socket";

let kernel = <Kernel>new Kernel();
let entry = <Module>new Entry();

entry.init = function () {
    console.log('entry.init()');
    console.info('it works! :)');
};

kernel.registerModule(entry);
entry.init();

let landing = new Landing();

document.body.innerHTML = landing.getContents();

let socket = <Socket>new Socket();

socket.connect('ws://localhost:3001');

socket.subscribe('msg', function (packet) {
    document.write(`
	<h1>Recieved message from socket:</h1>
	<pre>${JSON.stringify(packet)}</pre>
	`);
});