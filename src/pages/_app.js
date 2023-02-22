import { Inter } from '@next/font/google'

import '@/styles/globals.css'

import { ImageProvider } from '@/context/Image'

import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <ImageProvider>
        <Header />

        <Component {...pageProps} />
      </ImageProvider>
      <style jsx global>{`
        body {
          font-family: ${inter.fontFamily}, system-ui, sans-serif;
        }
      `}</style>
    </>
  )
}
