import {AmazonWebService} from "../../../../lib/model/aws/AmazonWebService";

let aws = new AmazonWebService();
let dynamoDB = new aws.AWS.DynamoDB({apiVersion: '2012-10-08'});

dynamoDB.listTables({Limit: 99}, function (err, data) {
    if (err) {
        console.log("Error", err.code);
    } else {
        console.log("Response", data.TableNames);
    }
});