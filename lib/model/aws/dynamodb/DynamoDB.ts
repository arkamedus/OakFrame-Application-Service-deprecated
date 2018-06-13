export class DynamoDB{
	private _dynamoDB;

	constructor (aws){
		this._dynamoDB = aws.AWS.DynamoDB;
	}
}