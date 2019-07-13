const AWS = require('aws-sdk')

module.exports = async function () {
  var documentClient = new AWS.DynamoDB.DocumentClient()
  var botsContainingParams = {
    TableName: this.config.table.event
  }

  // console.log(botsContainingParams)
  return documentClient.scan(botsContainingParams).promise()
}
