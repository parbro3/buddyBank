import json
import boto3
import random

def deleteMessage(dynamodb_client, tableName, partitionKey, rangeKey):
  print('about to delete message')
  print(partitionKey)
  print(rangeKey)
  response = dynamodb_client.delete_item(
    TableName=tableName,
    Key={
        'bucketId': {'S': partitionKey},
        'date': {'S': rangeKey}
    }
  )

def getMessage(dynamodb_client, tableName, partitionKey):
  # Use the DynamoDB client to query for all songs by artist Arturus Ardvarkian
  response = dynamodb_client.query(
    TableName=tableName,
    KeyConditionExpression='bucketId = :bucketId',
    ExpressionAttributeValues={
        ':bucketId': {'S': partitionKey}
    },
    Limit=1
  )
  return response['Items']
  
def getRandomBucketId():
  randomInt = random.randint(1,5)
  #this solution won't scale above 9
  return '000' + str(randomInt)
  

def handler(event, context):
  print('received event:')
  print(event)
  
  # Creating the DynamoDB Client
  dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
  
  messages = []
  bucketId = ''
  requestCounter = 0
  while(len(messages) == 0 and requestCounter < 5):
    requestCounter+=1
    bucketId = getRandomBucketId()
    messages = getMessage(dynamodb_client, 'buddyBankMessage', bucketId)
  
  message = messages[0]
  
  #deleteMessage(dynamodb_client, 'buddyBankMessage', bucketId, message['date']['S'])
  
  '''
  Get message count from dynamodb
  Because it's dynamo and not an easy SQL DB, I have to know where the actual partition is that I'm retrieving/querying.
  So... because I don't know that... I'm going to have a global secondary index called messageGroup which will be either set
  randomly, or by an increment somehow. Let's start between 1-5, and then the sort index will be the date...
  So I can grab a random message by calling the messageGroup between 1-5 and then getting the earliest of those.
  
  Maybe there can be a place where I have an atomic counter of each of the buckets. So I'm constantly keeping track of where everything is at
  But then I'd have to do two transactions each time. One to get the bucket counts.. and one to access the right record. This can be done in the future.
  '''
  
  
  body={
    'message':message['text']['S']
  }
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Credentials': True,
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(body)
  };