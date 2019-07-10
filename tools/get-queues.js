const AWS = require('aws-sdk')
var documentClient = new AWS.DynamoDB.DocumentClient()

module.exports = async function () {
  var botsContainingParams = {
    TableName: this.config.tables.events
  }

  // console.log(botsContainingParams)
  return documentClient.scan(botsContainingParams).promise()
}
