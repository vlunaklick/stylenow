import { useEffect, useState } from 'react'
import Head from 'next/head'

import { useImage } from '@/context/Image'

import { optimizeImage } from '@/services/cloudinary'

import CustomImage from '@/components/CustomImage'
import { Close } from '@/components/icons/Close'
import { useNavigation } from '@/hooks/useNavigation'

export default function Editor() {
  const { imageURL, publicID, resetData } = useImage()
  const { navigateToHome } = useNavigation()
  const [editedImage, setEditedImage] = useState(null)

  useEffect(() => {
    if (!imageURL) {
      navigateToHome()
    }
  }, [imageURL])

  const handleResetImage = () => {
    resetData()
    navigateToHome()
  }

  const handleOptimizeImage = async () => {
    const url = optimizeImage(publicID, 'auto:best')

    setEditedImage(url)
  }

  if (!imageURL) {
    return null
  }

  return (
    <>
      <Head>
        <title>Cropnow - Editor</title>
      </Head>

      <main className="max-w-3xl mx-auto w-full px-4 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center max-w-lg mx-auto text-slate-800 mt-10">
          Unleash your creativity with your image
        </h1>

        <section className="flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg sm:max-h-96 gap-2">
          <div className="flex flex-row justify-end w-full">
            <button onClick={handleResetImage}>
              <Close className="w-6 h-6 fill-slate-600" />
            </button>
          </div>

          <div className="flex flex-col w-full sm:flex-row gap-2">
            <section className="max-h-96 sm:max-w-[500px] flex justify-center overflow-hidden w-full sm:w-auto">
              <CustomImage
                src={editedImage || imageURL}
                alt="Image to edit"
                className="max-h-80 object-contain border border-slate-200 rounded-lg sm:mx-0 mx-auto"
              />
            </section>

            <section className="flex flex-col items-center justify-center">
              <button
                onClick={handleOptimizeImage}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                Optimize image
              </button>
            </section>
          </div>
        </section>

        <a
          href={editedImage || imageURL}
          download="image"
          target={'_blank'}
          rel="noreferrer"
          className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
        >
          Download
        </a>
      </main>
    </>
  )
}
