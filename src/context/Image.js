import { useState, createContext, useContext } from 'react'

import { convertToImageSrc } from '@/utils'
import { uploadImage } from '@/services/cloudinary'

const ImageContext = createContext()

const ImageProvider = ({ children }) => {
  const [file, setFile] = useState(null)
  const [imageURL, setImageURL] = useState('')
  const [publicID, setPublicID] = useState('')

  const handleDragImage = async e => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const src = await convertToImageSrc(file)

      setFile(file)
      setImageURL(src)

      uploadImage(file).then(res => {
        setPublicID(res.public_id)
      })
    }
  }

  const handleUploadImage = async e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const src = await convertToImageSrc(file)

      setFile(file)
      setImageURL(src)

      uploadImage(file).then(res => {
        setPublicID(res.public_id)
      })
    }
  }

  const setDataTest = publicID => {
    setPublicID(publicID)
    setImageURL(
      `https://res.cloudinary.com/djzg2tf6o/image/upload/v1677107271/${publicID}`
    )
  }

  const resetData = () => {
    setFile(null)
    setImageURL('')
    setPublicID('')
  }

  return (
    <ImageContext.Provider
      value={{
        imageURL,
        file,
        publicID,
        setDataTest,
        handleDragImage,
        handleUploadImage,
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
