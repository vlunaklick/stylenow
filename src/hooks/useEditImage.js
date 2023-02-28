import { useEffect, useState } from 'react'

import {
  getImage,
  optimizeImage,
  removeBackground,
} from '@/services/cloudinary'

const editsApplied = {
  optimize: false,
  removeBackground: false,
}

export function useEditImage({ publicId }) {
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [edits, setEdits] = useState(editsApplied)

  useEffect(() => {
    const fetchImage = async () => {
      const editedImage = await getImage(publicId)

      setImage(editedImage)
      setImageURL(editedImage.toURL())
    }

    if (publicId) {
      fetchImage()
    }
  }, [publicId])

  useEffect(() => {
    if (image) {
      const interval = setInterval(async () => {
        const res = await fetch(image.toURL())

        if (res.status === 200) {
          setImageURL(image.toURL())
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [image, edits])

  const handleOptimizeImage = async () => {
    if (edits.optimize) return

    const editedImage = optimizeImage(image, 80)

    setImage(editedImage)

    const interval = setInterval(async () => {
      const res = await fetch(editedImage.toURL())

      if (res.status === 200) {
        setImageURL(editedImage.toURL())
        clearInterval(interval)
      }
    }, 1000)

    setEdits({ ...edits, optimize: true })
  }

  const handleRemoveBackground = async () => {
    if (edits.removeBackground) return

    const imageWithout = await getImage(publicId)

    const editedImage = removeBackground(imageWithout)

    edits.optimize ? optimizeImage(editedImage, 80) : editedImage

    setImage(editedImage)

    const interval = setInterval(async () => {
      const res = await fetch(editedImage.toURL())

      if (res.status === 200) {
        setImageURL(editedImage.toURL())
        clearInterval(interval)
      }
    }, 1000)

    setEdits({ ...edits, removeBackground: true })
  }

  return {
    editedImage: image,
    editedImageURL: imageURL,
    handleOptimizeImage,
    handleRemoveBackground,
  }
}
