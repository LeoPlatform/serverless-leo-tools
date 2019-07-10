# serverless-leo-tools

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