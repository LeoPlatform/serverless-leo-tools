const AWS = require('aws-sdk')

module.exports = async function (value, scanFilterOverride = {}, selectKeys = []) {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  const ScanFilter = {
    'archived': {
      ComparisonOperator: 'NE',
      AttributeValueList: [true]
    }
  }
  ScanFilter.instances = {
    ComparisonOperator: 'NOT_NULL'
  }
  if (value) {
    ScanFilter.id = {
      ComparisonOperator: 'CONTAINS',
      AttributeValueList: [value]
    }
  }
  var botsContainingParams = {
    TableName: this.config.tables.bot,
    ScanFilter: Object.assign(ScanFilter, scanFilterOverride)
  }
  if (Array.isArray(selectKeys) && selectKeys.length > 0) {
    botsContainingParams = Object.assign(botsContainingParams, { AttributesToGet: selectKeys })
  }

  // console.log(botsContainingParams)
  return documentClient.scan(botsContainingParams).promise()
}
