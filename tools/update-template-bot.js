
const AWS = require('aws-sdk')

module.exports = function (botId, templateName) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  // for the given botId, set the templateId = templateName
  var templateIdValue = {
    TableName: this.config.tables.bot,
    Key: { id: botId },
    UpdateExpression: 'set #T = :t',
    ExpressionAttributeNames: { '#T': 'templateId' },
    ExpressionAttributeValues: { ':t': templateName }
  }

  return documentClient.update(templateIdValue).promise()
}
