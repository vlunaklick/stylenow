import { useEffect, useState } from 'react'

import { getImage, optimizeImage, grayScaleImage } from '@/services/cloudinary'

import { unifyEffects } from '@/helpers/urlParser'

const editsApplied = {
  optimize: false,
  grayscale: false,
}

export function useEditImage({ publicId }) {
  const [imageURL, setImageURL] = useState(null)
  const [edits, setEdits] = useState(editsApplied)

  useEffect(() => {
    const image = getImage(publicId)

    setImageURL(image.toURL())
  }, [publicId])

  const handleResetImage = () => {
    const image = getImage(publicId)

    setImageURL(image.toURL())
    setEdits(editsApplied)
  }

  const handleOptimizeImage = () => {
    if (edits.optimize) return

    const editedImageURL = optimizeImage(publicId, 'auto:good')

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, optimize: true })
  }

  const handleGrayScaleImage = () => {
    if (edits.grayscale) return

    const editedImageURL = grayScaleImage(publicId)

    const unifyEffectsURL = unifyEffects(imageURL, editedImageURL)

    setImageURL(unifyEffectsURL)

    setEdits({ ...edits, grayscale: true })
  }

  return {
    editedImageURL: imageURL,
    handleResetImage,
    handleOptimizeImage,
    handleGrayScaleImage,
  }
}
