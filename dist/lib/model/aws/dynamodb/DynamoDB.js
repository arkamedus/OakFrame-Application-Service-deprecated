"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DynamoDB = /** @class */ (function () {
    function DynamoDB(aws) {
        this._dynamoDB = aws.AWS.DynamoDB;
    }
    return DynamoDB;
}());
exports.DynamoDB = DynamoDB;
