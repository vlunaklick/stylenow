import { Inter } from '@next/font/google'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          font-family: ${inter.fontFamily}, system-ui, sans-serif;
        }
      `}</style>
    </>
  )
}
