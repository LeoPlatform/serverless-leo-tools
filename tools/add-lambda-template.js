
const AWS = require('aws-sdk')

module.exports = function (lambdaName, templateName) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  // in the Leo Settings table lambda-templates entry. Add lambdaname: templateName to the map
  var addLambdaTemplate = {
    TableName: this.config.tables.settings,
    Key: { id: 'lambda_templates' },
    UpdateExpression: 'set #V.#L = :l',
    ExpressionAttributeNames: {
      '#V': 'value',
      '#L': lambdaName
    },
    ExpressionAttributeValues: { ':l': templateName }
  }
  return documentClient.update(addLambdaTemplate).promise()
}
