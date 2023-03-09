import { useState } from 'react'
import {
  MdOutlineRestartAlt,
  MdSettingsBackupRestore,
  MdClose,
  MdOutlineHighQuality,
  MdBlurOn,
  MdColorize,
  MdOutlineBrightnessLow,
  MdCloudDownload,
  MdOutlineSettingsSystemDaydream,
} from 'react-icons/md'
import { ImSpinner } from 'react-icons/im'

import CustomImage from './CustomImage'
import EditorFilter from './EditorFilter'
import EditorButton from './EditorButton'

import { useImage } from '@/context/Image'
import { useInput } from '@/hooks/useInput'
import { useEditImage } from '@/hooks/useEditImage'

export default function EditorInterface() {
  const [section, setSection] = useState('edited')
  const { image, imageURL, resetData, fileSize: originalFileSize } = useImage()
  const { value: blurValue, onChange: handleBlurChange } = useInput({
    initialValue: 500,
  })
  const { value: colorizeValue, onChange: handleColorizeChange } = useInput({
    initialValue: '#0099ff',
  })
  const { value: brightnessValue, onChange: handleBrightnessChange } = useInput({
    initialValue: 0,
  })
  const { value: hueValue, onChange: handleHueChange } = useInput({
    initialValue: 0,
  })
  const { value: qualityValue, onChange: handleQualityChange } = useInput({
    initialValue: 'auto:default',
  })

  const [category, setCategory] = useState('')

  const {
    editedImageURL,
    isImageLoading,
    fileSize: editedFileSize,
    handleResetImage,
    handleUndoImage,
    handleQualityImage,
    handleGrayScaleImage,
    handleBlurImage,
    handleSepiaImage,
    handleImproveQualityImage,
    handleColorizeImage,
    handleBrightnessImage,
    handleRemoveBgImage,
    handleHueImage,
    handlePixelateImage,
  } = useEditImage({
    publicId: image.publicID,
  })

  const imageToDisplay = section === 'original' ? imageURL : editedImageURL

  const handleCategory = (cat) => {
    if (cat === category) {
      setCategory('')

      return
    }

    setCategory(cat)
  }

  return (
    <>
      <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg gap-4 min-h-80 dark:bg-slate-900 dark:border-slate-800">
        <section className="flex justify-between items-center w-full">
          <div className="flex w-full gap-4">
            <button
              className={`font-medium border-b-2 ${
                section === 'original'
                  ? 'text-indigo-800 border-indigo-800 dark:text-indigo-500 dark:border-indigo-500'
                  : 'text-slate-500 border-transparent dark:text-slate-400'
              }`}
              onClick={() => setSection('original')}
            >
              Original
            </button>
            <button
              className={`font-medium border-b-2 ${
                section === 'edited'
                  ? 'text-indigo-800 border-indigo-800 dark:text-indigo-500 dark:border-indigo-500'
                  : 'text-slate-500 border-transparent dark:text-slate-400'
              }`}
              onClick={() => setSection('edited')}
            >
              Edited
            </button>
          </div>

          <button onClick={resetData}>
            <MdClose className="w-6 h-6 text-slate-400 hover:text-slate-500 transition-colors" />
          </button>
        </section>

        <section className="flex justify-between w-full gap-4 flex-col min-[750px]:flex-row">
          <div
            className={
              'max-h-80 mx-auto max-w-md h-min min-[750px]:mx-0 flex items-center justify-center rounded-lg relative'
            }
          >
            <CustomImage
              alt={section === 'edited' ? 'Edited image' : 'Original image'}
              className="max-h-80 max-w-md border border-slate-200 rounded-lg w-full min-[750px]:w-auto dark:border-slate-800 min-w-[100px] min-h-[100px]"
              src={imageToDisplay}
            />

            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 rounded-lg dark:bg-slate-800/70">
                <ImSpinner className="animate-spin text-white text-2xl" />
              </div>
            )}

            <div className="absolute bottom-0 right-0 flex items-center gap-2 p-2 bg-white rounded-tl-lg dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {section === 'edited' ? `${editedFileSize} KB` : `${originalFileSize} KB`}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap h-min w-full">
            <div className="flex gap-2 w-full flex-wrap">
              <EditorButton variant="primary" onClick={handleResetImage}>
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdOutlineRestartAlt className="text-2xl" />
                  Reset
                </span>
              </EditorButton>

              <EditorButton variant="primary" onClick={handleUndoImage}>
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdSettingsBackupRestore className="text-2xl" />
                  Undo
                </span>
              </EditorButton>
            </div>

            <EditorFilter
              category="filters"
              categorySelected={category}
              handleCategory={handleCategory}
              name="Filters"
            >
              <EditorButton variant="secondary" onClick={handleGrayScaleImage}>
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdColorize className="text-2xl" />
                  Grayscale
                </span>
              </EditorButton>

              <EditorButton variant="secondary" onClick={handleSepiaImage}>
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdBlurOn className="text-2xl" />
                  Sepia
                </span>
              </EditorButton>

              <EditorButton variant="secondary" onClick={handlePixelateImage}>
                <span className="flex items-center gap-1 font-medium px-1">Pixelate</span>
              </EditorButton>

              <div className="flex items-center gap-2 w-full">
                <input
                  className="w-full p-1 h-9"
                  type="color"
                  value={colorizeValue}
                  onChange={handleColorizeChange}
                />

                <EditorButton
                  variant="secondary"
                  onClick={() => handleColorizeImage(50, colorizeValue)}
                >
                  <span className="flex items-center gap-1 font-medium px-1">
                    <MdColorize className="text-2xl" />
                    Colorize
                  </span>
                </EditorButton>
              </div>
            </EditorFilter>

            <EditorFilter
              category="adjustments"
              categorySelected={category}
              handleCategory={handleCategory}
              name="Adjustments"
            >
              <div className="flex items-center gap-2 w-full flex-wrap min-[370px]:flex-nowrap">
                <div className="flex items-center gap-2 w-full">
                  <input
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-800"
                    max="2000"
                    min="0"
                    step={100}
                    type="range"
                    value={blurValue}
                    onChange={handleBlurChange}
                  />

                  <div className="flex items-center justify-center gap-1 max-w-[37px] w-full">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      {blurValue}
                    </span>
                  </div>
                </div>

                <EditorButton variant="secondary" onClick={() => handleBlurImage(blurValue)}>
                  <span className="flex items-center gap-1 font-medium px-1">
                    <MdBlurOn className="text-2xl" />
                    Blur
                  </span>
                </EditorButton>
              </div>

              <div className="flex items-center gap-2 w-full flex-wrap min-[370px]:flex-nowrap">
                <div className="flex items-center gap-2 w-full">
                  <input
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-800"
                    max="100"
                    min="-99"
                    step={10}
                    type="range"
                    value={brightnessValue}
                    onChange={handleBrightnessChange}
                  />

                  <div className="flex items-center justify-center gap-1 max-w-[28px] w-full">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      {brightnessValue}
                    </span>
                  </div>
                </div>

                <EditorButton
                  variant="secondary"
                  onClick={() => handleBrightnessImage(brightnessValue)}
                >
                  <span className="flex items-center gap-1 font-medium px-1">
                    <MdOutlineBrightnessLow className="text-2xl" />
                    Brightness
                  </span>
                </EditorButton>
              </div>

              <div className="flex items-center gap-2 w-full flex-wrap min-[370px]:flex-nowrap">
                <div className="flex items-center gap-2 w-full">
                  <input
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-800"
                    max="100"
                    min="-100"
                    step={10}
                    type="range"
                    value={hueValue}
                    onChange={handleHueChange}
                  />

                  <div className="flex items-center justify-center gap-1 max-w-[28px] w-full">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      {hueValue}
                    </span>
                  </div>
                </div>

                <EditorButton variant="secondary" onClick={() => handleHueImage(hueValue)}>
                  <span className="flex items-center gap-1 font-medium px-1">Hue</span>
                </EditorButton>
              </div>
            </EditorFilter>

            <EditorFilter
              category="addons"
              categorySelected={category}
              handleCategory={handleCategory}
              name="Add-ons"
            >
              <div className="flex items-center gap-2 w-full flex-wrap min-[370px]:flex-nowrap">
                <select
                  className="border-2 border-slate-200 text-slate-500 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:border-slate-800 dark:text-slate-300 dark:bg-slate-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleQualityChange}
                >
                  <option value="auto:default">Default</option>
                  <option value="auto:good">Good</option>
                  <option value="auto:best">Best</option>
                  <option value="auto:eco">Eco</option>
                  <option value="auto:low">Low</option>
                </select>

                <EditorButton variant="secondary" onClick={() => handleQualityImage(qualityValue)}>
                  <span className="flex items-center gap-1 font-medium px-1">
                    <MdOutlineHighQuality className="text-2xl" />
                    Quality
                  </span>
                </EditorButton>
              </div>

              <EditorButton variant="secondary" onClick={handleImproveQualityImage}>
                <span className="flex items-center gap-1 font-medium px-1">Improve</span>
              </EditorButton>

              <EditorButton variant="secondary" onClick={handleRemoveBgImage}>
                <span className="flex items-center gap-1 font-medium px-1 w-full whitespace-nowrap">
                  <MdOutlineSettingsSystemDaydream className="text-2xl" />
                  Background Removal
                </span>
              </EditorButton>
            </EditorFilter>
          </div>
        </section>
      </div>

      <a
        className="flex items-center justify-center gap-2 w-min mx-auto p-2 px-4 bg-slate-700 hover:bg-slate-800 transition-colors text-white rounded-lg font-medium dark:bg-slate-800 dark:hover:bg-slate-700"
        download="edited-image.png"
        href={editedImageURL}
        rel="noreferrer"
        target={'_blank'}
      >
        <MdCloudDownload className="text-xl" />
        Download
      </a>
    </>
  )
}
