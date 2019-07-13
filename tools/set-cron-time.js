
const AWS = require('aws-sdk')

module.exports = function (botId, cronTime) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  var setCronTimeParams = {
    TableName: this.config.table.bot,
    Key: { id: botId },
    UpdateExpression: 'set #T = :t',
    ExpressionAttributeNames: { '#T': 'time' },
    ExpressionAttributeValues: { ':t': cronTime }
  }

  // console.log(setCronTimeParams)
  return documentClient.update(setCronTimeParams).promise()
}
