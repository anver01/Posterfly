import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createHash } from 'crypto'
import bcrypt from 'bcrypt'
import { createUser, getUserByPrimaryKey } from '../../../utility/dynamoService'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      async authorize (credentials) {
        try {
          // const password = createHash('sha256').update(credentials.password).digest('hex')
          let response
          if (credentials.newUser) {
            const passwordHash = await bcrypt.hash(credentials.password, parseInt(process.env.SALT_ROUNDS))
            await createUser({
              email: credentials.email,
              provider: 'credentials',
              username: credentials.username,
              passwordHash
            })
            return { email: credentials.email, provider: 'credentials' }
          } else {
            response = await getUserByPrimaryKey({
              email: credentials.email,
              provider: 'credentials'
            })
          }
          const user = response
          const passwordCompare = await bcrypt.compare(credentials.password, user.password)
          if (!user) return null
          if (user && !passwordCompare) throw new Error('Password is incorrect')
          else return user
        } catch (e) {
          console.log(e)
        }
      }
    })
  ],
  callbacks: {
    async signIn ({ user, account }) {
      if (account.provider === 'google') {
        const dbResponse = await getUserByPrimaryKey({
          email: user.email,
          provider: 'google'
        })
        if (!dbResponse) {
          const response = await createUser({
            email: user.email,
            provider: 'google',
            providerId: user.id,
            name: user.name
          })
          if (response) return true
        } else return true
      } else return true
    },
    async jwt ({ token, account, user }) {
      // if (account.provider === 'google') {
      //   const response = await getUserByPrimaryKey({
      //     email: user.email,
      //     provider: 'google'
      //   })
      //   token.userId = response.userId
      // } else {
      //   token.userId = user.userId
      // }
      return token
    },
    async session ({ session, token, user }) {
      // session.userId = token.userId
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
})
