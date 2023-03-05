import { useEffect, useState } from 'react'

import {
  getImage,
  compressImage,
  grayScaleImage,
  sepiaImage,
  blurImage,
  improveQuality,
  colorizeImage,
  changeBrightness,
  removeBg,
  hueImage,
  pixelateImage,
} from '@/services/cloudinary'
import { unifyEffects, getEffects } from '@/helpers/urlParser'
import { getImageFileSize } from '@/utils'

const editsApplied = {
  optimize: '',
  grayscale: '',
  sepia: '',
  blur: '',
  improveQuality: '',
  colorize: '',
  brightness: '',
  removeBg: '',
  hue: '',
  pixelate: '',
}

export function useEditImage({ publicId }) {
  const [imageURL, setImageURL] = useState(null)
  const [edits, setEdits] = useState(editsApplied)
  const [lastestEdits, setLastestEdits] = useState([])
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [fileSize, setFileSize] = useState(0)

  useEffect(() => {
    if (!imageURL) return

    setIsImageLoading(true)

    const image = new Image()

    image.src = imageURL

    image.onload = () => {
      setIsImageLoading(false)

      getImageFileSize(imageURL).then(size => {
        setFileSize(size / 1000)
      })
    }

    return () => {
      image.onload = null
    }
  }, [imageURL, publicId])

  useEffect(() => {
    const image = getImage(publicId)

    setImageURL(image.toURL())
  }, [publicId])

  const handleResetImage = () => {
    const image = getImage(publicId)

    setImageURL(image.toURL())
    setEdits(editsApplied)
    setLastestEdits([])
  }

  const handleUndoImage = () => {
    const lastestEdit = lastestEdits.pop()

    const effect = edits[lastestEdit]

    const removeEffectURL = imageURL.replace(effect, '')

    setImageURL(removeEffectURL)

    setEdits({ ...edits, [lastestEdit]: '' })
  }

  const handleQualityImage = value => {
    if (value === 'auto:default') {
      if (edits.optimize === '') return

      const editedImageURL = imageURL.replace(edits.optimize, '')

      setImageURL(editedImageURL)

      setEdits({ ...edits, optimize: '' })
      setLastestEdits(prevState => [
        ...prevState.filter(effect => effect !== 'optimize'),
      ])
      return
    }

    const editedImageURL = compressImage(publicId, value)

    if (edits.optimize === getEffects(editedImageURL)) return

    if (edits.optimize !== '') {
      const removeEffectURL = imageURL.replace(edits.optimize, '')

      const unifyEffectsURL = unifyEffects(removeEffectURL, editedImageURL)

      setImageURL(unifyEffectsURL)

      setEdits({ ...edits, optimize: getEffects(editedImageURL) })
      return
    }

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, optimize: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'optimize'])
  }

  const handleGrayScaleImage = () => {
    if (edits.grayscale !== '') return

    const editedImageURL = grayScaleImage(publicId)

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, grayscale: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'grayscale'])
  }

  const handleSepiaImage = () => {
    if (edits.sepia !== '') return

    const editedImageURL = sepiaImage(publicId, 80)

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, sepia: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'sepia'])
  }

  const handleBlurImage = value => {
    const editedImageURL = blurImage(publicId, value)

    if (edits.blur === getEffects(editedImageURL)) return

    if (edits.blur !== '') {
      const removeEffectURL = imageURL.replace(edits.blur, '')

      setImageURL(unifyEffects(removeEffectURL, editedImageURL))

      setEdits({ ...edits, blur: getEffects(editedImageURL) })
      setLastestEdits(prevState => [
        ...prevState.filter(effect => effect !== 'blur'),
        'blur',
      ])
      return
    }

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, blur: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'blur'])
  }

  const handleImproveQualityImage = () => {
    if (edits.improveQuality !== '') return

    const editedImageURL = improveQuality(publicId)

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, improveQuality: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'improveQuality'])
  }

  const handleColorizeImage = (intensity, colorType) => {
    const editedImageURL = colorizeImage(publicId, intensity, colorType)

    if (edits.colorize === getEffects(editedImageURL)) return

    if (edits.colorize !== '') {
      const removeEffectURL = imageURL.replace(edits.colorize, '')

      setImageURL(unifyEffects(removeEffectURL, editedImageURL))

      setEdits({ ...edits, colorize: getEffects(editedImageURL) })
      setLastestEdits(prevState => [
        ...prevState.filter(effect => effect !== 'colorize'),
        'colorize',
      ])
      return
    }

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, colorize: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'colorize'])
  }

  const handleBrightnessImage = value => {
    const editedImageURL = changeBrightness(publicId, value)

    if (edits.brightness === getEffects(editedImageURL)) return

    if (edits.brightness !== '') {
      const removeEffectURL = imageURL.replace(edits.brightness, '')

      setImageURL(unifyEffects(removeEffectURL, editedImageURL))

      setEdits({ ...edits, brightness: getEffects(editedImageURL) })
      setLastestEdits(prevState => [
        ...prevState.filter(effect => effect !== 'brightness'),
        'brightness',
      ])

      return
    }

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, brightness: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'brightness'])
  }

  const handleRemoveBgImage = () => {
    if (edits.removeBg !== '') return

    const editedImageURL = removeBg(publicId)

    const unifyEffectsURL = unifyEffects(editedImageURL, imageURL)

    setIsImageLoading(true)

    const interval = setInterval(async () => {
      const image = await fetch(unifyEffectsURL)

      if (image.status === 200) {
        setImageURL(unifyEffectsURL)

        setEdits({ ...edits, removeBg: getEffects(editedImageURL) })
        setLastestEdits(prevState => [...prevState, 'removeBg'])

        setIsImageLoading(false)

        clearInterval(interval)
      }
    }, 1000)
  }

  const handleHueImage = value => {
    const editedImageURL = hueImage(publicId, value)

    if (edits.hue === getEffects(editedImageURL)) return

    if (edits.hue !== '') {
      const removeEffectURL = imageURL.replace(edits.hue, '')

      setImageURL(unifyEffects(removeEffectURL, editedImageURL))

      setEdits({ ...edits, hue: getEffects(editedImageURL) })
      setLastestEdits(prevState => [
        ...prevState.filter(effect => effect !== 'hue'),
        'hue',
      ])

      return
    }

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, hue: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'hue'])
  }

  const handlePixelateImage = () => {
    if (edits.pixelate !== '') return

    const editedImageURL = pixelateImage(publicId, 15)

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, pixelate: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'pixelate'])
  }

  return {
    editedImageURL: imageURL,
    isImageLoading,
    fileSize,
    handleResetImage,
    handleUndoImage,
    handleQualityImage,
    handleGrayScaleImage,
    handleSepiaImage,
    handleBlurImage,
    handleImproveQualityImage,
    handleColorizeImage,
    handleBrightnessImage,
    handleRemoveBgImage,
    handleHueImage,
    handlePixelateImage,
  }
}
