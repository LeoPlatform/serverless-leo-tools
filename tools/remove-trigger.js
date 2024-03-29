
const AWS = require('aws-sdk')

module.exports = function (botId) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  var removeTriggersParams = {
    TableName: this.config.table.bot,
    Key: { id: botId },
    UpdateExpression: 'set #T = :t',
    ExpressionAttributeNames: { '#T': 'triggers' },
    ExpressionAttributeValues: { ':t': [] }
  }

  // console.log(removeTriggersParams)
  return documentClient.update(removeTriggersParams).promise()
}
