
const AWS = require('aws-sdk')

module.exports = function (botId) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  var removeCheckpointsParams = {
    TableName: this.config.tables.bot,
    Key: { id: botId },
    UpdateExpression: 'set #C.#R = :r, #C.#W = :w',
    ExpressionAttributeNames: { '#C': 'checkpoints', '#R': 'read', '#W': 'write' },
    ExpressionAttributeValues: { ':r': {}, ':w': {} }
  }

  return documentClient.update(removeCheckpointsParams).promise()
}
