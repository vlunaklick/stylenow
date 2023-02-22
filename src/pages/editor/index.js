import Head from 'next/head'

import { useImage } from '@/context/Image'

import UploadFile from '@/components/UploadFile'
import SmallTry from '@/components/sections/SmallTry'

export default function Editor() {
  const { file, imageURL } = useImage()

  if (!file) {
    return (
      <>
        <Head>
          <title>Cropnow - Editor</title>
        </Head>

        <main className="max-w-3xl mx-auto mt-4 w-full px-4">
          <h1 className="text-4xl font-bold mb-4 text-center max-w-lg mx-auto text-slate-800">
            Upload an image and get started
          </h1>

          <UploadFile />

          <SmallTry />
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Cropnow - Editor</title>
      </Head>

      <main className="max-w-3xl mx-auto mt-4 w-full px-4">
        <h1 className="text-4xl font-bold mb-4 text-center max-w-lg mx-auto text-slate-800">
          Upload an image and get started
        </h1>
      </main>
    </>
  )
}
