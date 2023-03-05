import { Inter } from '@next/font/google'

import '@/styles/globals.css'

import { ImageProvider } from '@/context/Image'

import Header from '@/components/Header'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>StyleNow</title>
        <meta
          name="description"
          content="Transform your photos into art with StyleNow - the easy and fast online image editor. Try it for free now!"
        />
      </Head>

      <ThemeProvider attribute="class">
        <ImageProvider>
          <Header />

          <Component {...pageProps} />

          <Footer />
        </ImageProvider>
      </ThemeProvider>
      <style jsx global>{`
        body {
          font-family: ${inter.fontFamily}, system-ui, sans-serif;
        }
      `}</style>
    </>
  )
}
