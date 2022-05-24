import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

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

export async function createUser (userDetails) {
  const response = await client.put({
    TableName: process.env.AUTH_TABLE,
    Item: {
      userId: uuidv4(),
      ...userDetails
    }
  })
  if (response) return true
  else return false
}

export async function getUserByPrimaryKey (key) {
  const response = await client.get({
    TableName: process.env.AUTH_TABLE,
    Key: key
  })
  return response && response.Item
}

export async function getOrCreateUser (userDetails) {
  const user = await getUserByPrimaryKey({
    email: userDetails.email,
    provider: userDetails.provider
  })
  if (!user) {
    return createUser(userDetails)
  } else return user
}
