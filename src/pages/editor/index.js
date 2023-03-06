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
        <title>StyleNow - Editor</title>
      </Head>

      <main className="max-w-3xl mx-auto w-full px-4 flex flex-col gap-8 min-h-[calc(100vh-52px-86px)] relative">
        <h1 className="text-4xl font-bold text-center max-w-lg mx-auto text-slate-800 mt-10 dark:text-slate-50">
          Visualize your
          <span className="to-indigo-300 from-indigo-400 text-transparent bg-gradient-to-t bg-clip-text dark:from-indigo-500 dark:to-indigo-400">
            {' '}
            perfect image{' '}
          </span>
          instantly
        </h1>

        <EditorInterface />

        <div className="absolute w-[30%] h-[30%] gradient-03 -z-10 right-0 top-0 bottom-0 hidden dark:block" />

        <div className="absolute w-[30%] opacity-50  gradient-04 -z-10 left-0 top-0 bottom-0 hidden dark:block" />

        <div className="absolute w-[30%] h-[30%] gradient-05 -z-10 right-0 bottom-0 hidden dark:block" />
      </main>
    </>
  )
}
