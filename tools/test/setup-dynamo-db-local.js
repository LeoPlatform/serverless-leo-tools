const AWS = require('aws-sdk')

var dynamodb = new AWS.DynamoDB()
var documentClient = new AWS.DynamoDB.DocumentClient()

module.exports = async () => {
  const seeding = []

  await createCronTable()
  seeding.push(seedCronTable())

  await createStatsTable()
  seeding.push(seedStatsTable())

  await createSettingsTable()
  seeding.push(seedSettingsTable())

  await createEventTable()
  seeding.push(seedEventTable())

  return Promise.all(seeding)
}

const testConfig = {
  tables: {
    bot: 'test-LeoCron',
    stats: 'test-LeoStats',
    settings: 'test-LeoSettings',
    events: 'test-LeoEvent',
    entities: ''
  }
}

module.exports.config = testConfig

/* This example creates a table named Music. */

const createCronTable = () => {
  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: testConfig.table.bot
  }
  return dynamodb.createTable(params).promise()
}

const seedCronTable = () => {
  var params = {
    RequestItems: {
      [testConfig.table.bot]: [
        {
          PutRequest: {
            Item: {
              id: 'test-one'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-one-var-foo'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-one-var-bar'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-rogue-bot-one',
              errorCount: 11,
              instances: {
                '0': {
                  status: 'error'
                }
              }
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-not-rogue-bot-two',
              errorCount: 10,
              instances: {
                '0': {
                  status: 'error'
                }
              }
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-remove-trigger-bot-id',
              time: '* * * * *',
              triggers: ['foo']
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-remove-checkpoints-bot-id',
              checkpoints: {
                read: { foo: 'bar' },
                write: { bar: 'baz' }
              }
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-archive-bot-id'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: 'test-pause-bot-id'
            }
          }
        }
      ]
    }
  }

  return documentClient.batchWrite(params).promise()
}

const createStatsTable = () => {
  return Promise.resolve()
}
const seedStatsTable = () => {
  return Promise.resolve()
}

const createSettingsTable = () => {
  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: testConfig.table.setting
  }
  return dynamodb.createTable(params).promise()
}

const seedSettingsTable = () => {
  var params = {
    RequestItems: {
      [testConfig.table.setting]: [
        {
          PutRequest: {
            Item: {
              id: 'lambda_templates',
              value: {}
            }
          }
        }
      ]
    }
  }

  return documentClient.batchWrite(params).promise()
}

const createEventTable = () => {
  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'event',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'event',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: testConfig.table.event
  }
  return dynamodb.createTable(params).promise()
}

const seedEventTable = () => {
  var params = {
    RequestItems: {
      [testConfig.table.event]: [
        {
          PutRequest: {
            Item: {
              event: 'test_queue_one',
              max_eid: 'z/2019/07/10/02/05/1562724310249-0003205',
              timestamp: 1562724311547,
              v: 2
            }
          }
        },
        {
          PutRequest: {
            Item: {
              event: 'test_queue_two',
              max_eid: 'z/2019/07/10/02/05/1562724310249-0003205',
              timestamp: 1562724311547,
              v: 2
            }
          }
        }
      ]
    }
  }

  return documentClient.batchWrite(params).promise()
}
