
const AWS = require('aws-sdk')

// module.exports = async (value, scanFilterOverride = {}) => {
// function getEventsForQueue (queue, start, end, limit, done) {
module.exports = async function (queue, start, end, limit) {
  var dynamoClient = new AWS.DynamoDB.DocumentClient()
  var getEventsParams = {
    TableName: this.config.table.event,
    KeyConditionExpression: '#event = :event and #key between :start and :maxkey',
    ExpressionAttributeNames: {
      '#event': 'event',
      '#key': 'end'
    },
    ExpressionAttributeValues: {
      ':event': queue,
      ':start': start,
      ':maxkey': end
    },
    Limit: limit
  }

  //   dynamoClient.query(getEventsParams, function (err, result) {
  //     if (err) {
  //       console.log(`Error querying events for ${queue}`, err, err.stack)
  //       return done(err, [])
  //     }
  //     done(null, result)
  //   })

  return dynamoClient.query(getEventsParams).promise() /* .then(result => result) */
}
