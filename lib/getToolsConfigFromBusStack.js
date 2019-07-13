const AWS = require('aws-sdk')

module.exports = async function (leoBusStackName) {
  var cloudformation = new AWS.CloudFormation()
  var params = { StackName: leoBusStackName }
  const descStackresult = await cloudformation.describeStacks(params).promise()
  const validStackStatuses = ['CREATE_COMPLETE', 'ROLLBACK_COMPLETE', 'UPDATE_COMPLETE', 'UPDATE_ROLLBACK_COMPLETE']
  const validStacks = descStackresult.Stacks.filter(s => validStackStatuses.includes(s.StackStatus))
  if (validStacks.length === 0) {
    throw new Error('Stack in invalid status')
  }
  if (validStacks.length > 1) {
    throw new Error('Multiple stacks match criteria')
  }
  const stackOutputs = validStacks[0].Outputs
  const leoStackConfiguration = {
    table: {
      // register: stackOutputs.find(o => o.OutputKey === 'Register').OutputValue,
      // region: stackOutputs.find(o => o.OutputKey === 'Region').OutputValue,
      bot: stackOutputs.find(o => o.OutputKey === 'LeoCron').OutputValue,
      setting: stackOutputs.find(o => o.OutputKey === 'LeoSettings').OutputValue,
      event: stackOutputs.find(o => o.OutputKey === 'LeoEvent').OutputValue,
      s3: stackOutputs.find(o => o.OutputKey === 'LeoS3').OutputValue,
      system: stackOutputs.find(o => o.OutputKey === 'LeoSystem').OutputValue
    }
  }
  return leoStackConfiguration
}
