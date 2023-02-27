import { useState, useEffect } from 'react'
import Head from 'next/head'

import { useImage } from '@/context/Image'
import { useEditImage } from '@/hooks/useEditImage'
import { useNavigation } from '@/hooks/useNavigation'

import CustomImage from '@/components/CustomImage'
import { Close } from '@/components/icons/Close'

export default function Editor() {
  const { image, imageURL, resetData } = useImage()
  const {
    editedImage,
    editedImageURL,
    handleOptimizeImage,
    handleRemoveBackground,
  } = useEditImage({
    publicId: image.publicID,
  })
  const [section, setSection] = useState('edited')
  const { navigateToHome } = useNavigation()

  useEffect(() => {
    if (!imageURL) {
      navigateToHome()
    }
  }, [imageURL, navigateToHome])

  const handleResetImage = () => {
    resetData()
    navigateToHome()
  }

  if (!imageURL) {
    return null
  }

  const imageToDisplay = section === 'edited' ? editedImageURL : imageURL

  return (
    <>
      <Head>
        <title>Cropnow - Editor</title>
      </Head>

      <main className="max-w-3xl mx-auto w-full px-4 flex flex-col gap-8 min-h-[calc(100vh-52px-86px)]">
        <h1 className="text-4xl font-bold text-center max-w-lg mx-auto text-slate-800 mt-10">
          Unleash your
          <span className="to-indigo-400 from-indigo-800 text-transparent bg-gradient-to-t bg-clip-text">
            {' '}
            creativity{' '}
          </span>
          with your image
        </h1>

        <section className="relative flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg sm:max-h-96 gap-4">
          <button onClick={handleResetImage} className="absolute top-4 right-4">
            <Close className="w-6 h-6 fill-slate-400 hover:fill-slate-500 transition-colors" />
          </button>

          <div className="flex flex-col w-full sm:flex-row gap-2">
            <section className="max-h-96 sm:max-w-[500px] flex flex-col justify-center overflow-hidden w-full">
              <div className="flex w-full gap-4 mb-2">
                <button
                  onClick={() => setSection('original')}
                  className={`font-medium border-b-2 ${
                    section === 'original'
                      ? 'text-indigo-800 border-indigo-800'
                      : 'text-slate-500 border-transparent'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setSection('edited')}
                  className={`font-medium border-b-2 ${
                    section === 'edited'
                      ? 'text-indigo-800 border-indigo-800'
                      : 'text-slate-500 border-transparent'
                  }`}
                >
                  Edited
                </button>
              </div>
              <CustomImage
                src={imageToDisplay}
                alt={section === 'edited' ? 'Edited image' : 'Original image'}
                className="max-h-80 object-contain border border-slate-200 rounded-lg mx-auto"
              />
            </section>

            <section className="flex flex-col items-center justify-center">
              <button
                onClick={handleOptimizeImage}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                Optimize image
              </button>

              <button
                onClick={handleRemoveBackground}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg mt-4"
              >
                Remove background
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
