import { Inter } from '@next/font/google'

import '@/styles/globals.css'

import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { ImageProvider } from '@/context/Image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>StyleNow</title>
        <meta
          content="Transform your photos into art with StyleNow - the easy and fast online image editor. Try it for free now!"
          name="description"
        />
      </Head>

      <ThemeProvider attribute="class">
        <ImageProvider>
          <Header />

          <Component {...pageProps} />

          <Footer />
        </ImageProvider>
      </ThemeProvider>
      <style global jsx>{`
        body {
          font-family: ${inter.fontFamily}, system-ui, sans-serif;
        }
      `}</style>
    </>
  )
}
