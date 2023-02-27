import { useEffect, useState } from 'react'

import {
  getImage,
  optimizeImage,
  removeBackground,
} from '@/services/cloudinary'

export function useEditImage({ publicId }) {
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(null)

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

  const handleOptimizeImage = async () => {
    const url = optimizeImage(image, 'auto:best')

    setImage(url)
  }

  const handleRemoveBackground = async () => {
    const url = removeBackground(image)

    const interval = setInterval(async () => {
      const res = await fetch(url.toURL())

      console.log(res.status)

      if (res.status === 200) {
        clearInterval(interval)
        setImageURL(url.toURL())
      }
    }, 1500)
  }

  return {
    editedImage: image,
    editedImageURL: imageURL,
    handleOptimizeImage,
    handleRemoveBackground,
  }
}
