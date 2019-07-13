
const AWS = require('aws-sdk')

module.exports = function (botId, pauseState = true) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  var setPauseParameters = {
    TableName: this.config.table.bot,
    Key: { id: botId },
    UpdateExpression: 'set #P = :p',
    ExpressionAttributeNames: { '#P': 'paused' },
    ExpressionAttributeValues: { ':p': pauseState }
  }

  return documentClient.update(setPauseParameters).promise()
}
