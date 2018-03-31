import {AmazonWebService} from "../../../../shared/app/model/aws/AmazonWebService";
import {DynamoDB} from "../../../../shared/app/model/aws/dynamodb/DynamoDB";

let aws = new AmazonWebService();

// Create the DynamoDB service object
let dynamoDB = new aws.AWS.DynamoDB({apiVersion: '2012-10-08'});

// Call DynamoDB to retrieve the list of tables
dynamoDB.listTables({Limit: 10}, function(err, data) {
	if (err) {
		console.log("Error", err.code);
	} else {
		console.log("Table names are ", data.TableNames);
	}
});