import { useState, useEffect, createContext, useContext } from 'react'

import { getImage } from '@/services/cloudinary'

const ImageContext = createContext()

const ImageProvider = ({ children }) => {
  const [publicId, setPublicId] = useState('')
  const [image, setImage] = useState('')
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    if (publicId) {
      const image = getImage(publicId)

      setImage(image)
      setImageURL(image.toURL())
    }
  }, [publicId])

  const handlePublicId = publicId => {
    setPublicId(publicId)
  }

  const resetData = () => {
    setPublicId('')
    setImage('')
    setImageURL('')
  }

  return (
    <ImageContext.Provider
      value={{
        image,
        imageURL,
        handlePublicId,
        resetData,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

const useImage = () => {
  const context = useContext(ImageContext)

  if (!context) {
    throw new Error('useImage must be used within a ImageProvider')
  }

  return context
}

export { ImageProvider, useImage }
