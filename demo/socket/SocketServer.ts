///<reference path="../../lib/model/endpoint/Endpoint.ts"/>

import {SocketProvider} from "../../lib/model/provider/socket/SocketProvider";
import {Endpoint} from "../../lib/model/endpoint/Endpoint";

let socket = new SocketProvider(new Endpoint());

socket.listen('handshake', function (request, response) {
    response.send(JSON.stringify({handshake: Date.now()}));
});