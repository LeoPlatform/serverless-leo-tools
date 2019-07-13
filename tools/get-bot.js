
const AWS = require('aws-sdk')

const getBot = function (id) {
  var dynamoClient = new AWS.DynamoDB.DocumentClient()
  var getBotParams = {
    TableName: this.config.table.bot,
    Key: {
      'id': id
    }
  }

  return dynamoClient.get(getBotParams).promise().then(result => result.Item)
}

module.exports = getBot
