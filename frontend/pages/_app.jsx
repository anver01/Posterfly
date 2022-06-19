import React from 'react'
import { SessionProvider } from 'next-auth/react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/global.css'
import Head from 'next/head'
import { io } from 'socket.io-client'

function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
  const socket = io(process.env.NEXT_APP_WEBSOCKET_URL || 'http://localhost:5000')
  return (
    <SessionProvider session={session}>
      <Head>
        <meta
          name="description"
          content="Posterfly - the social media for your true self"
        />
        <meta name="og:title" content='Posterfly' />
        <title>Posterfly</title>
      </Head>
      <Navbar/>
      <Component {...pageProps} socket={socket} />
      <Footer/>
    </SessionProvider>
  )
}

export default MyApp
