import { useState } from 'react'

import { useImage } from '@/context/Image'
import { useEditImage } from '@/hooks/useEditImage'

import CustomImage from './CustomImage'
import { Close } from './icons/Close'

export default function EditorInterface() {
  const [section, setSection] = useState('edited')
  const { image, imageURL, resetData } = useImage()

  const {
    editedImageURL,
    handleResetImage,
    handleUndoImage,
    handleOptimizeImage,
    handleGrayScaleImage,
    handleBlurImage,
    handleSepiaImage,
  } = useEditImage({
    publicId: image.publicID,
  })

  const imageToDisplay = section === 'edited' ? editedImageURL : imageURL

  return (
    <>
      <section className="relative flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg sm:max-h-96 gap-4">
        <button onClick={resetData} className="absolute top-4 right-4">
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

          <section className="flex flex-col w-full gap-4">
            <button
              onClick={handleResetImage}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
            >
              Reset
            </button>

            <button
              onClick={handleUndoImage}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
            >
              Undo
            </button>

            <button
              onClick={handleOptimizeImage}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
            >
              Optimize
            </button>

            <button
              onClick={handleGrayScaleImage}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
            >
              Grayscale
            </button>

            <button
              onClick={handleBlurImage}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
            >
              Blur
            </button>

            <button
              onClick={handleSepiaImage}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
            >
              Sepia
            </button>
          </section>
        </div>
      </section>

      <a
        href={editedImageURL || imageURL}
        download="image"
        target={'_blank'}
        rel="noreferrer"
        className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg w-min mx-auto"
      >
        Download
      </a>
    </>
  )
}
