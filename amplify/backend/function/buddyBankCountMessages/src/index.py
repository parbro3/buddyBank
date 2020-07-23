import json
import boto3
import random

'''
def describeTable(dynamodb_client, tableName):
  # Use the DynamoDB client to query for all songs by artist Arturus Ardvarkian
  response = dynamodb_client.describe_table(
    TableName=tableName
  )
  print('here is the response')
  print(response)
  return response['Table']['ItemCount']
'''

def getCount(dynamodb_client, tableName, partitionKey, sortKey):
  response = dynamodb_client.get_item(
    TableName=tableName,
    Key={
        'bucketId':{'S':'0000'},
        'date':{'S':'2020-01-01 00:00:00.00'}
      }
  )
  return response['Item']['messageCount']['N']


def handler(event, context):
  print('received event:')
  print(event)
  
  # Creating the DynamoDB Client
  dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
  
  #this is a unique partion and sort key to get the app metadata. Temporary fix for now.
  count = getCount(dynamodb_client, 'buddyBankMessage', '0000', '2020-01-01 00:00:00.00')

  
  body={
    'messageCount':count
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