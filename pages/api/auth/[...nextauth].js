import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'
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

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      async authorize (credentials, req) {
        return await client.get({
          TableName: 'posterfly-auth',
          Key: { pk: credentials.username, sk: credentials.password }
        }).then(res => {
          console.log(res.Item)
          if (res.Item) return res.Item
          else throw Error
        }).catch(err => {
          console.log(err)
          return null
        })
      }
    })
  ],
  adapter: DynamoDBAdapter(
    client, { tableName: process.env.AUTH_TABLE }
  ),
  pages: {
    signIn: '/auth/login'
  }
})
