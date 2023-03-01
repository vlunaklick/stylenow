import { useEffect, useState } from 'react'

import {
  getImage,
  optimizeImage,
  grayScaleImage,
  sepiaImage,
  blurImage,
} from '@/services/cloudinary'
import { unifyEffects, getEffects } from '@/helpers/urlParser'

const editsApplied = {
  optimize: '',
  grayscale: '',
  sepia: '',
  blur: '',
}

export function useEditImage({ publicId }) {
  const [imageURL, setImageURL] = useState(null)
  const [edits, setEdits] = useState(editsApplied)
  const [lastestEdits, setLastestEdits] = useState([])

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

  const handleOptimizeImage = () => {
    if (edits.optimize !== '') return

    const editedImageURL = optimizeImage(publicId, 'auto:good')

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

  const handleBlurImage = () => {
    if (edits.blur !== '') return

    const editedImageURL = blurImage(publicId, 1000)

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, blur: getEffects(editedImageURL) })
    setLastestEdits(prevState => [...prevState, 'blur'])
  }

  return {
    editedImageURL: imageURL,
    handleResetImage,
    handleUndoImage,
    handleOptimizeImage,
    handleGrayScaleImage,
    handleSepiaImage,
    handleBlurImage,
  }
}
