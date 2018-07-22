import {AmazonWebService} from "../../../../lib/model/aws/AmazonWebService";

let aws = new AmazonWebService();
let dynamoDB = new aws.AWS.DynamoDB.DocumentClient({apiVersion: '2012-10-08'});

let params = {
    TableName: 'ENTRY_LIST',
    Item: {
        'ENTRY_ID' : 1,
        'ENTRY_NAME' : 'Entry Name',
    }
};

dynamoDB.put(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});