import {Subscribe} from "../subscribe/Subscribe";

export class Socket {
	_socket:WebSocket;
	_subscribe:Subscribe;
	connect(endpoint:string):any{
		this._socket = new WebSocket(endpoint);
		this._socket.onopen = function(e){
			console.log(e);
		}
	}
	subscribe():any{

	}
	send(packet):any{

	}
}