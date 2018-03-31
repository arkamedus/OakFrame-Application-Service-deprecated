//** @interface Provider is like a serializable promise
interface Provider {
	then():any;
	error():any;
	end():any;
	get(instance:any):any;
}