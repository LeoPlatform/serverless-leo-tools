
const AWS = require('aws-sdk')

module.exports = function (botId, instanceNumber) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  var purgeInstanceLogsParams = {
    TableName: this.config.tables.bot,
    Key: { id: botId },
    UpdateExpression: 'set #I.#X.#L = :l',
    ExpressionAttributeNames: { '#I': 'instances', '#X': instanceNumber.toString(), '#L': 'logs' },
    ExpressionAttributeValues: { ':l': {
      errors: [],
      notices: []
    } }
  }

  return documentClient.update(purgeInstanceLogsParams).promise()
}
