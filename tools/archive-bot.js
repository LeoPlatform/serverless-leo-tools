
const AWS = require('aws-sdk')

module.exports = function (botId) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  var archiveBotParams = {
    TableName: this.config.tables.bot,
    Key: { id: botId },
    UpdateExpression: 'set #A = :a',
    ExpressionAttributeNames: { '#A': 'archived' },
    ExpressionAttributeValues: { ':a': true }
  }

  return documentClient.update(archiveBotParams).promise()
}
