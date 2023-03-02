import { useEffect, useState } from 'react'

import {
  getImage,
  optimizeImage,
  grayScaleImage,
  sepiaImage,
  blurImage,
  improveQuality,
} from '@/services/cloudinary'
import { unifyEffects, getEffects } from '@/helpers/urlParser'

const editsApplied = {
  optimize: '',
  grayscale: '',
  sepia: '',
  blur: '',
  improveQuality: '',
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

  return {
    editedImageURL: imageURL,
    handleResetImage,
    handleUndoImage,
    handleOptimizeImage,
    handleGrayScaleImage,
    handleSepiaImage,
    handleBlurImage,
    handleImproveQualityImage,
  }
}
