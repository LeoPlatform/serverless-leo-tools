const getToolsConfigFromBusStack = require('./getToolsConfigFromBusStack')
const Tools = require('../tools')

module.exports = {
  async createLeoTools () {
    if (!this.serverless.service.provider.leo) {
      return Promise.reject(new Error('"leo" property is missing in "provider" in serverless.yml'))
    }
    if (!this.serverless.service.provider.leo.stack) {
      return Promise.reject(new Error('"stack" property is missing in "provider.leo" in serverless.yml'))
    }

    // const creds = this.provider.getCredentials()
    // console.log(creds)
    // AWS.config.credentials = creds.credentials
    // AWS.config.region = creds.region
    const toolsConfig = await getToolsConfigFromBusStack(this.serverless.service.provider.leo.stack)
    // console.log(toolsConfig)
    this.serverless.variables.leoTools = new Tools(toolsConfig)
  }
}
