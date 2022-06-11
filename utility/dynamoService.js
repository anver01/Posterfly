import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const config = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY
  },
  region: process.env.NEXT_AUTH_AWS_REGION
}

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true
  }
})

async function createUser (userDetails) {
  try {
    const response = await client.put({
      TableName: process.env.AUTH_TABLE,
      Item: userDetails
    })
    if (response.$metadata.httpStatusCode === 200) return { ...userDetails }
    else return false
  } catch (e) {
    console.error('Error creating user', e)
  }
}

async function getUserByPrimaryKey (key) {
  try {
    const response = await client.get({
      TableName: process.env.AUTH_TABLE,
      Key: key
    })
    return response && response.Item
  } catch (e) {
    console.error('Error getting user', e)
  }
}

export async function getOrCreateUser (userDetails) {
  const user = await getUserByPrimaryKey({
    email: userDetails.email,
    sk: userDetails.sk
  })
  if (!user) {
    return createUser(userDetails)
  } else return user
}

export async function createAccount (accountDetails, provider) {
  const account = {
    ...accountDetails,
    sk: `ACCOUNT#${provider}`
  }
  try {
    const response = await client.put({
      TableName: process.env.AUTH_TABLE,
      Item: account
    })
    if (response.$metadata.httpStatusCode === 200) return { ...account }
    else return false
  } catch (e) {
    console.error('Error creating user', e)
  }
}

export async function getOrCreateAccount (userDetails, provider) {
  const user = await getUserByPrimaryKey({
    email: userDetails.email,
    sk: `ACCOUNT#${provider}`
  })
  if (!user) {
    return createAccount(userDetails, provider)
  } else return user
}

export async function updateUsername (username, email) {
  const response = await client.update({
    TableName: process.env.AUTH_TABLE,
    Key: {
      email,
      sk: 'USER'
    },
    UpdateExpression: 'set username = :x',
    ExpressionAttributeValues: {
      ':x': username
    },
    ReturnValues: 'ALL_NEW'
  })
  return response
}
