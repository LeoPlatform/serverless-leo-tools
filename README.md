# serverless-leo
Serverless plugin. Deploy your leo bots and microservices using serverless.

## Prerequisites

1. Must have an [AWS](https://aws.amazon.com/) account
2. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) must be installed and configured
3. Must have the [Leo Platform](https://github.com/LeoPlatform/Leo#install-the-leo-platform-stack) deployed to your AWS account
4. Must have [nodejs](https://nodejs.org/en/)


## Install serverless globally
If you don't have serverless framework globally installed
```
npm install serverless -g
```

## Create a new NodeJS Leo Microservice and Bot
```
serverless create --template-url https://github.com/LeoPlatform/serverless-leo/tree/master/templates/microservice -p my-microservice
cd my-microservice
npm install
serverless create bot --name my-bot-name
```

## Add serverless-leo to existing NodeJS project
```
npm install serverless-leo --save-dev
```

## Leo serverless.yml
```
plugins:
  - serverless-leo # Enable serverless-leo plugin

custom:
  leoStack: TestBus # Configure serverless-leo

functions:
  hello:
    handler: index.handler
    events:
      - leo: helloWorldTestQueue # Trigger Lambda from a Leo Queue
  
  world:
    handler: index.handler
    events:
		- leo
			cron: 0 0 1 * * *  # Trigger Lambda from a Leo Cron (down to minute)
```

## Deploy your microservice
Use the standard `serverless deploy` cli command to deploy your microservice. Optional -s or -stage parameter (standard serverless).

## Examples
Requires the leo platform (bus). Step 2 in this guide: https://github.com/LeoPlatform/Leo#install-the-leo-platform-stack
##### Nodejs - https://github.com/LeoPlatform/serverless-leo/tree/master/examples/nodejs
##### Java - https://github.com/LeoPlatform/serverless-leo/tree/master/examples/java-quickstart
##### Python (incomplete) - https://github.com/LeoPlatform/serverless-leo/tree/master/examples/python

## Documentation
### Trigger lambdas from a Leo queue
Create a "bot" that will run when events are added to a queue. The events will be handled in order and only one lambda will handle events at a time.
```
hello:
  handler: index.handler
  events:
    - leo: helloWorldTestQueue
```
You can specify multiple queues for a single lambda. Each will become a separate bot, visible in the bus ui (Botmon).

#### Name bots
You can define the queue as an object and give the bot a name. Otherwise the name of the bot will be the name of the lambda plus the queue.
```
hello:
  handler: index.handler
  events:
    - leo: 
        queue: helloWorldTestQueue
        name: helloBot
```

### Trigger lambdas on a schedule
Create a "bot" that will run on a cron schedule. Only one lambda will run at any given time for a single bot.
```
world:
  handler: index.handler
  events:
  	- leo:
		cron: 0 0 1 * * * 
```
The bot will be named the same as the lambda.

### Variations
Create multiple bots using the same lambda by adding "botCount". This will create the number of bots specified and pass in "botNumber" into the event when the bot is ran.
```
world:
  handler: index.handler
  events:
	- leo:
		queue: helloWorldTestQueue
  		botCount: 4
```
This allows you to partition the queue, or change the configuration of the bot based on the value of the variable at run time.

### Manual bots
Create bots without a trigger by adding "register: true".
```
world:
  handler: index.handler
  events:
	- leo:
  		register: true
```

### LeoRegister configuration
You can configure the plugin to use different stacks for different stages.
```
custom:
  dev:
    leoStack: TestBus
  test:
    # The arn for the LeoInstallFunction lambda in your leo platform stack.
    # This is an alternative to using the leoStack variable. EG: the bus and lambda are in different accounts.
    leoRegister: arn:aws:lambda:us-east-1:123456:function:TestBus-LeoInstallFunction-2IMP25UOQ64G
```
In this example leoStack would be used when deployed using --stage dev. leoRegister would be used when using --stage test

## Tools
Here are some tools to see what is happening in your bus

```
provider:
  name: aws
  runtime: nodejs10.x
  leo:
    stack: dev-bus
```

### List Bots
`serverless leo list-bots`
`serverless leo list-queues`
`serverless leo get-events`

## Development

If you are going to develop for serverless-leo, some of the unit test rely on dynamodb-local which requires you to have Java installed.

Must set AWS_SDK_LOAD_CONFIG=true in order for the NODE AWS SDK to get the config from the environment (https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html#using-a-shared-config-file)
Set it in your source profile, so you don't have to worry about it again.