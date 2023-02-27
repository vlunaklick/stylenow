import { useEffect, useState } from 'react'

import { getImage, optimizeImage } from '@/services/cloudinary'

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

  return { editedImage: image, editedImageURL: imageURL, handleOptimizeImage }
}
