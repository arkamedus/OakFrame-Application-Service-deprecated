import {AmazonWebService} from "../../../../lib/model/aws/AmazonWebService";

let aws = new AmazonWebService();
let dynamoDB = new aws.AWS.DynamoDB.DocumentClient({apiVersion: '2012-10-08'});

let params = {
    ExpressionAttributeValues: {
        ':s': {N: '1'},
        ':e' : {N: '09'},
        ':topic' : {S: 'ENTRY_NAME'}
    },
    ProjectionExpression: 'Episode, Title, Subtitle',
    FilterExpression: 'contains (Subtitle, :topic)',
    TableName: 'ENTRY_LIST'
};

dynamoDB.scan(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {

        data.Items.forEach(function(element, index, array) {
            console.log(element.ENTRY_ID.N + " (" + element.ENTRY_NAME.S + ")");
        });

    }
});