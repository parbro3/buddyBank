import json
import boto3
import random

def describeTable(dynamodb_client, tableName):
  # Use the DynamoDB client to query for all songs by artist Arturus Ardvarkian
  response = dynamodb_client.describe_table(
    TableName=tableName
  )
  print('here is the response')
  print(response)
  return response['Table']['ItemCount']

def handler(event, context):
  print('received event:')
  print(event)
  
  # Creating the DynamoDB Client
  dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
  count = describeTable(dynamodb_client, 'buddyBankMessage')
  
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