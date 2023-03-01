import { useEffect } from 'react'
import Head from 'next/head'

import { useImage } from '@/context/Image'
import { useNavigation } from '@/hooks/useNavigation'
import EditorInterface from '@/components/EditorInterface'

export default function Editor() {
  const { imageURL } = useImage()

  const { navigateToHome } = useNavigation()

  useEffect(() => {
    if (!imageURL) {
      navigateToHome()
    }
  }, [imageURL, navigateToHome])

  if (!imageURL) {
    return null
  }

  return (
    <>
      <Head>
        <title>Cropnow - Editor</title>
      </Head>

      <main className="max-w-3xl mx-auto w-full px-4 flex flex-col gap-8 min-h-[calc(100vh-52px-86px)]">
        <h1 className="text-4xl font-bold text-center max-w-lg mx-auto text-slate-800 mt-10">
          Unleash your
          <span className="to-indigo-300 from-indigo-400 text-transparent bg-gradient-to-t bg-clip-text">
            {' '}
            creativity{' '}
          </span>
          with your image
        </h1>

        <EditorInterface />
      </main>
    </>
  )
}
