import { Cloudinary } from '@cloudinary/url-gen'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { v4 as uuidv4 } from 'uuid'

import { UPLOAD_URL } from '@/constants'

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'djzg2tf6o',
  },
  url: {
    secure: true,
  },
})

export const uploadImage = async file => {
  const formData = new FormData()
  formData.append('upload_preset', 'ml_default')
  formData.append('timestamp', Date.now() / 1000)
  formData.append('api_key', 892432879355161)
  formData.append('file', file)
  formData.append('public_id', uuidv4())
  formData.append('folder', 'cropnow')

  const res = await fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()

  return data
}

export const getImage = publicID => {
  const image = cloudinary.image(publicID)

  return image
}

export const optimizeImage = (publicID, qualityImg) => {
  const image = cloudinary.image(publicID)

  image.delivery(quality(qualityImg))

  const url = image.toURL() + '.webp'

  return url
}
