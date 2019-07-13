
const AWS = require('aws-sdk')

module.exports = async function (variationBaseName) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  // Anything that begins with variationBaseName
  var getVariationsWithBaseName = {
    TableName: this.config.table.bot,
    ScanFilter: {
      'id': {
        ComparisonOperator: 'BEGINS_WITH',
        AttributeValueList: [variationBaseName]
      },
      'archived': {
        ComparisonOperator: 'NE',
        AttributeValueList: [true]
      }
    },
    Select: 'ALL_ATTRIBUTES'
  }

  const variations = await documentClient.scan(getVariationsWithBaseName).promise()

  return variations.Items
}
