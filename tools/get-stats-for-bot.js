
const AWS = require('aws-sdk')

function getStatsForBot (botId, done) {
  var dynamoClient = new AWS.DynamoDB.DocumentClient()
  var getStatsParams = {
    TableName: this.config.tables.stats,
    KeyConditionExpression: '#id = :botId',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ExpressionAttributeValues: {
      ':botId': `bot:${botId}`
    }
  }

  dynamoClient.query(getStatsParams, function (err, result) {
    if (err) {
      console.log(`Error querying stats for ${botId}`, err, err.stack)
      return done(err, [])
    }
    done(null, result.Items)
  })
}

module.exports = getStatsForBot
