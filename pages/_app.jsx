import React from 'react'
import { SessionProvider } from 'next-auth/react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/global.css'
import Head from 'next/head'

function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
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
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
  )
}

export default MyApp
