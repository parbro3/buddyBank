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
  return response
  
def incrementMessages(dynamodb_client, tableName):
  response = dynamodb_client.update_item(
    TableName=tableName, 
    Key={
        'bucketId': {'S': '0000'},
        'date': {'S': '2020-01-01 00:00:00.00'}
    },
    UpdateExpression='SET messageCount = messageCount + :inc',
    ExpressionAttributeValues={
        ':inc': {'N': '1'}
    },
    ReturnValues="UPDATED_NEW"
  )
  return response
  
def getRandomBucketId():
  randomInt = random.randint(1,5)
  #this solution won't scale above 9
  return '000' + str(randomInt)
  

def handler(event, context):
  print('received event:')
  print(event)
  
  #It'll be a string if coming via http... but in testing it'll be a dict
  body = event['body']
  if not isinstance(body, dict):
    body = json.loads(body)
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
  depositResponse = depositeMessage(dynamodb_client, 'buddyBankMessage', putData)
  
  #if the insert succeeded then increment the atomic message counter
  if depositResponse['ResponseMetadata']['HTTPStatusCode'] == 200:
    incrementMessages(dynamodb_client,'buddyBankMessage');
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Credentials': True,
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
  };