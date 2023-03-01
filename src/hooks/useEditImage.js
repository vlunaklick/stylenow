import { useEffect, useState } from 'react'

import { getImage, optimizeImage, grayScaleImage } from '@/services/cloudinary'

import { unifyEffects, getEffects } from '@/helpers/urlParser'

const editsApplied = {
  optimize: '',
  grayscale: '',
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

  return {
    editedImageURL: imageURL,
    handleResetImage,
    handleUndoImage,
    handleOptimizeImage,
    handleGrayScaleImage,
  }
}
