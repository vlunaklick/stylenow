import { useState, createContext, useContext } from 'react'

import { convertToImageSrc } from '@/utils'

const ImageContext = createContext()

const ImageProvider = ({ children }) => {
  const [file, setFile] = useState(null)
  const [imageURL, setImageURL] = useState(null)

  const handleDragImage = async e => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const src = await convertToImageSrc(file)
      console.log(src)

      setFile(file)
      setImageURL(src)
    }
  }

  const handleUploadImage = async e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const src = await convertToImageSrc(file)

      setFile(file)
      setImageURL(src)
    }
  }

  return (
    <ImageContext.Provider
      value={{ imageURL, file, handleDragImage, handleUploadImage }}
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
