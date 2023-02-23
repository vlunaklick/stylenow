import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { v4 as uuidv4 } from 'uuid'

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'djzg2tf6o',
  },
  url: {
    secure: true,
  },
})

const URL = 'https://api.cloudinary.com/v1_1/djzg2tf6o/image/upload'

export const uploadImage = async file => {
  const formData = new FormData()
  formData.append('upload_preset', 'ml_default')
  formData.append('timestamp', Date.now() / 1000)
  formData.append('api_key', 892432879355161)
  formData.append('file', file)
  formData.append('public_id', uuidv4())

  const res = await fetch(URL, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()

  return data
}

export const resizeFile = async (publicId, width, height) => {
  const image = cloudinary.image(publicId)

  image.resize(thumbnail(width, height))

  const url = image.toURL()

  return url
}
