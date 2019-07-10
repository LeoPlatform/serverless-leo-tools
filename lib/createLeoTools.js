const Tools = require('./tools')
const AWS = require('aws-sdk')

async function createLeoTools () {
  if (!this.serverless.service.provider.leo) {
    return Promise.reject(new Error('"leo" property is missing in "provider" in serverless.yml'))
  }
  if (!this.serverless.service.provider.leo.stack) {
    return Promise.reject(new Error('"stack" property is missing in "provider.leo" in serverless.yml'))
  }
  var cloudformation = new AWS.CloudFormation()
  if (!cloudformation.config.credentials) {
    throw new Error('No AWS Credentials found')
  }
  // if (cloudformation.config)
  var params = { StackName: this.serverless.service.provider.leo.stack }
  const stacks = await cloudformation.describeStacks(params).promise()
  const validStackStatuses = ['CREATE_COMPLETE', 'ROLLBACK_COMPLETE', 'UPDATE_COMPLETE', 'UPDATE_ROLLBACK_COMPLETE']
  const validStacks = stacks.Stacks.filter(s => validStackStatuses.includes(s.StackStatus))
  if (validStacks.length === 0) {
    return Promise.reject(new Error('Stack in invalid status'))
  }
  if (validStacks.length > 1) {
    return Promise.reject(new Error('Multiple stacks match criteria'))
  }
  const stackOutputs = validStacks[0].Outputs
  const toolsConfig = {
    tables: {
      // register: stackOutputs.find(o => o.OutputKey === 'Register').OutputValue,
      // region: stackOutputs.find(o => o.OutputKey === 'Region').OutputValue,
      bot: stackOutputs.find(o => o.OutputKey === 'LeoCron').OutputValue,
      settings: stackOutputs.find(o => o.OutputKey === 'LeoSettings').OutputValue,
      events: stackOutputs.find(o => o.OutputKey === 'LeoEvent').OutputValue,
      s3: stackOutputs.find(o => o.OutputKey === 'LeoS3').OutputValue,
      system: stackOutputs.find(o => o.OutputKey === 'LeoSystem').OutputValue
    }
  }
  // console.log(toolsConfig)
  this.serverless.variables.leoTools = new Tools(toolsConfig)
}

module.exports = createLeoTools
