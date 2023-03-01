import { useState } from 'react'

import {
  MdOutlineRestartAlt,
  MdSettingsBackupRestore,
  MdClose,
  MdHighQuality,
} from 'react-icons/md'

import { useImage } from '@/context/Image'
import { useEditImage } from '@/hooks/useEditImage'

import CustomImage from './CustomImage'
import EditorButton from './EditorButton'

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
      <section className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg gap-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-full gap-4">
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

          <button onClick={resetData}>
            <MdClose className="w-6 h-6 text-slate-400 hover:text-slate-500 transition-colors" />
          </button>
        </div>

        <section className="flex justify-center w-full gap-4 flex-col sm:flex-row">
          <CustomImage
            src={imageToDisplay}
            alt={section === 'edited' ? 'Edited image' : 'Original image'}
            className="max-h-80 object-contain border border-slate-200 rounded-lg mx-auto max-w-md"
          />
          <section className="flex w-full gap-2 flex-wrap h-min">
            <EditorButton onClick={handleResetImage}>
              <span className="flex items-center gap-1 font-medium px-1">
                <MdOutlineRestartAlt className="text-2xl" />
                Restart
              </span>
            </EditorButton>

            <EditorButton onClick={handleUndoImage}>
              <span className="flex items-center gap-1 font-medium px-1">
                <MdSettingsBackupRestore className="text-2xl" />
                Undo
              </span>
            </EditorButton>

            <EditorButton onClick={handleOptimizeImage}>
              <span className="flex items-center gap-1 font-medium px-1">
                <MdHighQuality className="text-2xl" />
                Optimize
              </span>
            </EditorButton>

            <EditorButton onClick={handleBlurImage}>
              <span className="flex items-center gap-1 font-medium px-1">
                Blur
              </span>
            </EditorButton>

            <EditorButton onClick={handleGrayScaleImage}>
              <span className="flex items-center gap-1 font-medium px-1">
                Grayscale
              </span>
            </EditorButton>

            <EditorButton onClick={handleSepiaImage}>
              <span className="flex items-center gap-1 font-medium px-1">
                Sepia
              </span>
            </EditorButton>
          </section>
        </section>
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
