'use strict'

// Serverless LifeCycle cheat sheet https://gist.github.com/HyperBrain/50d38027a8f57778d5b0f135d80ea406

const BbPromise = require('bluebird')
const createLeoTools = require('./lib/createLeoTools')

class ServerlessLeoTools {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options
    this.provider = this.serverless.getProvider('aws')
    this.commands = {
      leo: {
        commands: {
          'list-bots': {
            usage: 'List the bots from your leo bus',
            lifecycleEvents: [
              'create-leo-tools',
              'get-bots'
            ]
            // TODO: pagination options like AWS
            // options: {
            //   'starting-token': {
            //     usage: 'Used for pagination. Token where you left off (NextToken)'
            //   },
            //   'max-items': {
            //     usage: 'Total number of items to return'
            //   }
            // }
          },
          'list-queues': {
            usage: 'List the queues from your leo bus',
            lifecycleEvents: [
              'create-leo-tools',
              'get-queues'
            ]
          }
        }
      }
    }

    Object.assign(
      this,
      createLeoTools
    )

    this.hooks = {
      'leo:list-bots:create-leo-tools': this.createLeoTools.bind(this),
      'leo:list-bots:get-bots': async () => {
        const { leoTools } = serverless.variables
        const bots = await leoTools.getBotsContaining()
        console.log(JSON.stringify(bots, null, 2)) // sending to user
      },
      'leo:list-queues:create-leo-tools': this.createLeoTools.bind(this),
      'leo:list-queues:get-queues': async () => {
        const { leoTools } = serverless.variables
        const queues = await leoTools.getQueues()
        console.log(JSON.stringify(queues, null, 2)) // sending to user
      }
    }
  }
}

module.exports = ServerlessLeoTools
