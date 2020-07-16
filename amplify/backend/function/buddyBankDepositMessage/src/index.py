import json
import boto3
import random
import datetime

def depositeMessage(dynamodb_client, tableName, data):
  print('here is the data to be deposited')
  print(data)
  response = dynamodb_client.put_item(
    Item=data,
    ReturnConsumedCapacity='TOTAL',
    TableName=tableName,
  )
  print('here is the response')
  print(response)
  
def getRandomBucketId():
  randomInt = random.randint(1,5)
  #this solution won't scale above 9
  return '000' + str(randomInt)
  

def handler(event, context):
  print('received event:')
  print(event)
  
  body = json.loads(event['body'])
  print('body parsed: ')
  print(body)
  
  message = body['message']
  accountId = body['accountId']
  
  #get message and account information from post request
  
  putData = {
    'text' : {'S' : message},
    'accountId' : {'S' : accountId},
    'date' : {'S' : str(datetime.datetime.now())},
    'bucketId' : {'S' : getRandomBucketId()}
  }
  
  # Creating the DynamoDB Client
  dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
  depositeMessage(dynamodb_client, 'buddyBankMessage', putData)
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Credentials': True,
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
  };