import Head from 'next/head'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TestImages from '@/components/TestImages'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cropnow</title>
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto mt-4 w-full">
        <Hero />
        <TestImages />
      </main>
    </>
  )
}
