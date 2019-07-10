
const AWS = require('aws-sdk')

const getSetting = function (id) {
  var dynamoClient = new AWS.DynamoDB.DocumentClient()
  var getSettingParams = {
    TableName: this.config.tables.settings,
    Key: {
      'id': id
    }
  }

  return dynamoClient.get(getSettingParams).promise().then(result => result.Item)
}

module.exports = getSetting
