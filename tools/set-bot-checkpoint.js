
const AWS = require('aws-sdk')

module.exports = function (botId, readCheckpointKey, newCheckpointEid) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  if (typeof readCheckpointKey === 'undefined' || readCheckpointKey.length === 0) return Promise.resolve()
  var setCheckpointsParams = {
    TableName: this.config.table.bot,
    Key: { id: botId },
    UpdateExpression: 'set #C.#R.#K.#CP = :cp',
    ExpressionAttributeNames: { '#C': 'checkpoints', '#R': 'read', '#K': readCheckpointKey, '#CP': 'checkpoint' },
    ExpressionAttributeValues: { ':cp': newCheckpointEid }
  }

  // console.log(setCheckpointsParams)
  return documentClient.update(setCheckpointsParams).promise()
}
