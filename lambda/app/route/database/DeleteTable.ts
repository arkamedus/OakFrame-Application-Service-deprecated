import {AmazonWebService} from "../../../../lib/model/aws/AmazonWebService";

let aws = new AmazonWebService();
let dynamoDB = new aws.AWS.DynamoDB({apiVersion: '2012-10-08'});

let params = {
    TableName: 'ENTRY_LIST'
};

dynamoDB.deleteTable(params, function (err, data) {
    if (err && err.code === 'ResourceNotFoundException') {
        console.log("Table not found");
    } else if (err && err.code === 'ResourceInUseException') {
        console.log("Table in use");
    } else {
        console.log("Success", data);
    }
});