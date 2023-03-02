import { useState } from 'react'

import {
  MdOutlineRestartAlt,
  MdSettingsBackupRestore,
  MdClose,
  MdHighQuality,
  MdBlurOn,
  MdTrendingUp,
  MdColorize,
  MdOutlineBrightnessLow,
  MdOutlineSettingsSystemDaydream,
} from 'react-icons/md'

import { useImage } from '@/context/Image'
import { useInput } from '@/hooks/useInput'
import { useEditImage } from '@/hooks/useEditImage'

import CustomImage from './CustomImage'
import EditorButton from './EditorButton'

export default function EditorInterface() {
  const [section, setSection] = useState('edited')
  const { image, imageURL, resetData } = useImage()
  const { value: blurValue, onChange: handleBlurChange } = useInput({
    initialValue: 500,
  })
  const { value: colorizeValue, onChange: handleColorizeChange } = useInput({
    initialValue: '#0099ff',
  })
  const { value: brightnessValue, onChange: handleBrightnessChange } = useInput(
    {
      initialValue: 0,
    }
  )

  const {
    editedImageURL,
    handleResetImage,
    handleUndoImage,
    handleOptimizeImage,
    handleGrayScaleImage,
    handleBlurImage,
    handleSepiaImage,
    handleImproveQualityImage,
    handleColorizeImage,
    handleBrightnessImage,
    handleRemoveBgImage,
  } = useEditImage({
    publicId: image.publicID,
  })

  const imageToDisplay = section === 'edited' ? editedImageURL : imageURL

  return (
    <>
      <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg gap-4">
        <section className="flex justify-between items-center w-full">
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
        </section>

        <section className="flex justify-center w-full gap-4 flex-col min-[750px]:flex-row">
          <CustomImage
            src={imageToDisplay}
            alt={section === 'edited' ? 'Edited image' : 'Original image'}
            className="max-h-80 object-contain border border-slate-200 rounded-lg mx-auto max-w-md w-full h-min"
          />

          <div className="flex gap-2 flex-wrap h-min">
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
                <MdTrendingUp className="text-2xl" />
                Optimize
              </span>
            </EditorButton>

            <EditorButton onClick={handleImproveQualityImage}>
              <span className="flex items-center gap-1 font-medium px-1">
                <MdHighQuality className="text-2xl" />
                Improve
              </span>
            </EditorButton>

            <div className="flex items-center gap-2 w-full flex-wrap min-[370px]:flex-nowrap">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step={100}
                  value={blurValue}
                  onChange={handleBlurChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />

                <div className="flex items-center justify-center gap-1 max-w-[37px] w-full">
                  <span className="font-medium text-slate-500">
                    {blurValue}
                  </span>
                </div>
              </div>

              <EditorButton onClick={() => handleBlurImage(blurValue)}>
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdBlurOn className="text-2xl" />
                  Blur
                </span>
              </EditorButton>
            </div>

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

            <div className="flex items-center gap-2 w-full">
              <input
                type="color"
                value={colorizeValue}
                onChange={handleColorizeChange}
                className="w-full p-1 h-9"
              />

              <EditorButton
                onClick={() => handleColorizeImage(50, colorizeValue)}
              >
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdColorize className="text-2xl" />
                  Colorize
                </span>
              </EditorButton>
            </div>

            <div className="flex items-center gap-2 w-full flex-wrap min-[370px]:flex-nowrap">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="range"
                  min="-99"
                  max="100"
                  step={10}
                  value={brightnessValue}
                  onChange={handleBrightnessChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />

                <div className="flex items-center justify-center gap-1 max-w-[28px] w-full">
                  <span className="font-medium text-slate-500">
                    {brightnessValue}
                  </span>
                </div>
              </div>

              <EditorButton
                onClick={() => handleBrightnessImage(brightnessValue)}
              >
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdOutlineBrightnessLow className="text-2xl" />
                  Brightness
                </span>
              </EditorButton>
            </div>

            {
              // TODO: Open it before the hackathon
              // <EditorButton onClick={handleRemoveBgImage}>
              //   <span className="flex items-center gap-1 font-medium px-1">
              //     <MdOutlineSettingsSystemDaydream className="text-2xl" />
              //     Remove BG
              //   </span>
              // </EditorButton>
            }
          </div>
        </section>
      </div>

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
