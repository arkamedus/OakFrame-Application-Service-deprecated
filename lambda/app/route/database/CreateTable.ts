import {AmazonWebService} from "../../../../lib/model/aws/AmazonWebService";

let aws = new AmazonWebService();
let dynamoDB = aws.dynamoDB();

let params = {
    TableName: 'ENTRY_LIST',
    StreamSpecification: {
        StreamEnabled: false
    },
    AttributeDefinitions: [
        {AttributeName: 'ENTRY_ID', AttributeType: 'N'},
        {AttributeName: 'ENTRY_NAME', AttributeType: 'S'}
    ],
    KeySchema: [
        {AttributeName: 'ENTRY_ID', KeyType: 'HASH'},
        {AttributeName: 'ENTRY_NAME', KeyType: 'RANGE'}
    ],
    ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1}
};

dynamoDB.createTable(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Created", data);
    }
});