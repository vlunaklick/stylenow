import Head from 'next/head'

import Hero from '@/components/Hero'
import ClickToTry from '@/components/sections/ClickToTry'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cropnow</title>
      </Head>

      <main className="max-w-3xl mx-auto mt-4 w-full">
        <Hero />
        <ClickToTry />
      </main>
    </>
  )
}
