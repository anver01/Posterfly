import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { getOrCreateAccount, getOrCreateUser } from '../../../utility/dynamoService'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      async authorize (credentials) {
        try {
          const userDetails = {
            email: credentials.email,
            sk: 'USER',
            username: credentials.username
          }
          const passwordHash = await bcrypt.hash(credentials.password, parseInt(process.env.SALT_ROUNDS))
          const accountDetails = {
            email: credentials.email,
            password: passwordHash
          }
          const response = await Promise.allSettled([getOrCreateUser(userDetails), getOrCreateAccount(accountDetails, 'credentials')])
          const passwordCompare = await bcrypt.compare(credentials.password, response[1].value.password)
          if (!response[0].value) return null
          if (response[0].value && !passwordCompare) throw new Error('Password is incorrect')
          else return response[0].value
        } catch (e) {
          console.error(e)
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, account, user }) {
      const userDetails = {
        email: user?.email,
        sk: 'USER'
      }
      if (user && account && account.provider === 'google') {
        const accountDetails = {
          email: user.email,
          name: user.name,
          providerId: user.id
        }
        const response = await Promise.allSettled([getOrCreateUser(userDetails), getOrCreateAccount(accountDetails, 'google')])
        token.username = response[0].value.username
      }
      if (user && account && account.provider === 'credentials') {
        token.username = user.username
      }
      return token
    },
    async session ({ session, token }) {
      session.username = token.username
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
})
