import { useState } from 'react'

import {
  MdOutlineRestartAlt,
  MdSettingsBackupRestore,
  MdClose,
  MdHighQuality,
  MdBlurOn,
  MdCompress,
  MdColorize,
  MdOutlineBrightnessLow,
  MdOutlineSettingsSystemDaydream,
  MdCloudDownload,
} from 'react-icons/md'

import { useImage } from '@/context/Image'
import { useInput } from '@/hooks/useInput'
import { useEditImage } from '@/hooks/useEditImage'

import CustomImage from './CustomImage'
import EditorFilter from './EditorFilter'
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
  const { value: hueValue, onChange: handleHueChange } = useInput({
    initialValue: 0,
  })
  const { value: compressValue, onChange: handleCompressChange } = useInput({
    initialValue: 'auto:good',
  })

  const [category, setCategory] = useState('')

  const {
    editedImageURL,
    isImageLoading,
    fileSize,
    handleResetImage,
    handleUndoImage,
    handleCompressImage,
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

  const handleCategory = cat => {
    if (cat === category) {
      setCategory('')
      return
    }

    setCategory(cat)
  }

  return (
    <>
      <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg gap-4 min-h-80">
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

        <section className="flex justify-between w-full gap-4 flex-col min-[750px]:flex-row">
          <div
            className={
              'max-h-80 mx-auto max-w-md h-min min-[750px]:mx-0 flex items-center justify-center rounded-lg relative'
            }
          >
            <CustomImage
              src={imageToDisplay}
              alt={section === 'edited' ? 'Edited image' : 'Original image'}
              className="max-h-80 max-w-md border border-slate-200 rounded-lg w-full min-[750px]:w-auto"
            />

            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 rounded-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-400"></div>
              </div>
            )}

            <div className="absolute bottom-0 right-0 flex items-center gap-2 p-2 bg-white rounded-tl-lg">
              <span className="text-xs text-slate-500">
                {fileSize ? `${fileSize} KB` : '0 KB'}
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
              name="Filters"
              categorySelected={category}
              category="filters"
              handleCategory={handleCategory}
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
                <span className="flex items-center gap-1 font-medium px-1">
                  Pixelate
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
              name="Adjustments"
              categorySelected={category}
              category="adjustments"
              handleCategory={handleCategory}
            >
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

                <EditorButton
                  variant="secondary"
                  onClick={() => handleBlurImage(blurValue)}
                >
                  <span className="flex items-center gap-1 font-medium px-1">
                    <MdBlurOn className="text-2xl" />
                    Blur
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
                    type="range"
                    min="-100"
                    max="100"
                    step={10}
                    value={hueValue}
                    onChange={handleHueChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex items-center justify-center gap-1 max-w-[28px] w-full">
                    <span className="font-medium text-slate-500">
                      {hueValue}
                    </span>
                  </div>
                </div>

                <EditorButton
                  variant="secondary"
                  onClick={() => handleHueImage(hueValue)}
                >
                  <span className="flex items-center gap-1 font-medium px-1">
                    Hue
                  </span>
                </EditorButton>
              </div>
            </EditorFilter>

            <EditorFilter
              name="Add-ons"
              categorySelected={category}
              category="addons"
              handleCategory={handleCategory}
            >
              <div className="flex items-center gap-2 w-full flex-wrap min-[370px]:flex-nowrap">
                <select
                  onChange={handleCompressChange}
                  className="border-2 border-slate-200 text-slate-500 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                >
                  <option value="auto:good">Good</option>
                  <option value="auto:best">Best</option>
                  <option value="auto:eco">Eco</option>
                  <option value="auto:low">Low</option>
                </select>

                <EditorButton
                  variant="secondary"
                  onClick={() => handleCompressImage(compressValue)}
                >
                  <span className="flex items-center gap-1 font-medium px-1">
                    <MdOutlineSettingsSystemDaydream className="text-2xl" />
                    Compress
                  </span>
                </EditorButton>
              </div>

              <EditorButton
                variant="secondary"
                onClick={handleImproveQualityImage}
              >
                <span className="flex items-center gap-1 font-medium px-1">
                  <MdHighQuality className="text-2xl" />
                  Improve
                </span>
              </EditorButton>

              {
                // TODO: Open it before the hackathon
                // <EditorButton variant="secondary" onClick={handleRemoveBgImage}>
                //   <span className="flex items-center gap-1 font-medium px-1">
                //     <MdOutlineSettingsSystemDaydream className="text-2xl" />
                //     Background Removal
                //   </span>
                // </EditorButton>
              }
            </EditorFilter>
          </div>
        </section>
      </div>

      <a
        href={editedImageURL}
        download="edited-image.png"
        target={'_blank'}
        rel="noreferrer"
        className="flex items-center justify-center gap-2 w-min mx-auto p-2 px-4 bg-slate-700 hover:bg-slate-800 transition-colors text-white rounded-lg font-medium"
      >
        <MdCloudDownload className="text-xl" />
        Download
      </a>
    </>
  )
}
