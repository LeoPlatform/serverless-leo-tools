
const AWS = require('aws-sdk')

module.exports = async function () {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  // Anything with '-var' in the name is a variation
  var getAllVariations = {
    TableName: this.config.table.bot,
    ScanFilter: {
      'id': {
        ComparisonOperator: 'CONTAINS',
        AttributeValueList: ['-var-']
      },
      'archived': {
        ComparisonOperator: 'NE',
        AttributeValueList: [true]
      }
    },
    Select: 'ALL_ATTRIBUTES'
  }

  const variations = await documentClient.scan(getAllVariations).promise()

  const baseNames = variations.Items.reduce((accumulator, current) => {
    const baseName = current.id.substring(0, current.id.indexOf('-var-'))
    if (!(baseName in accumulator)) {
      accumulator[baseName] = baseName
    }
    return accumulator
  }, {})

  return Object.keys(baseNames)
}
