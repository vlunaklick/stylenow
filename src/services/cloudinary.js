import { Cloudinary } from '@cloudinary/url-gen'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { v4 as uuidv4 } from 'uuid'

import {
  grayscale,
  pixelate,
  blur,
  colorize,
  sharpen,
  sepia,
  opacity,
} from '@cloudinary/url-gen/actions/effect'
import { improve, brightness, hue } from '@cloudinary/url-gen/actions/adjust'
import { backgroundRemoval } from '@cloudinary/url-gen/actions/effect'
import { crop } from '@cloudinary/url-gen/actions/resize'

import { UPLOAD_URL } from '@/constants'

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
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

export const getImage = publicId => {
  const image = cloudinary.image(`${publicId}`)

  return image
}

export const optimizeImage = (publicId, qualityImg) => {
  const image = cloudinary.image(publicId)

  image.delivery(quality(qualityImg))

  return image.toURL()
}

export const grayScaleImage = publicId => {
  const image = cloudinary.image(publicId)

  image.effect(grayscale())

  return image.toURL()
}

export const cropImage = (publicId, widthImg, heightImg, xImg, yImg) => {
  const image = cloudinary.image(publicId)

  image.resize(crop().width(widthImg).height(heightImg).x(xImg).y(yImg))

  return image.toURL()
}

export const hueImage = (publicId, hueLevel = 80) => {
  const image = cloudinary.image(publicId)

  image.adjust(hue().level(hueLevel))

  return image.toURL()
}

export const pixeleteImageZone = (
  publicId,
  widthImg,
  heightImg,
  xImg,
  yImg
) => {
  const image = cloudinary.image(publicId)

  image
    .effect(
      pixelate().region(
        custom().width(widthImg).height(heightImg).x(xImg).y(yImg)
      )
    )
    .resize(fill())

  image.adjust(pixelate().amount(10))

  return image.toURL()
}

export const improveQuality = publicId => {
  const image = cloudinary.image(publicId)

  image.adjust(improve())

  return image.toURL()
}

export const changeSaturation = (publicId, saturationLevel = 80) => {
  const image = cloudinary.image(publicId)

  image.adjust(saturation().level(saturationLevel))

  return image.toURL()
}

export const sepiaImage = (publicId, sepiaLevel = 80) => {
  const image = cloudinary.image(publicId)

  image.adjust(sepia().level(sepiaLevel))

  return image.toURL()
}

export const changeOpacity = (publicId, opacityStrength = 100) => {
  const image = cloudinary.image(publicId)

  image.adjust(opacity(opacityStrength))

  return image.toURL()
}

export const changeBrightness = (publicId, brightnessStrength = 100) => {
  const image = cloudinary.image(publicId)

  image.adjust(brightness().level(brightnessStrength))

  return image.toURL()
}

export const addSharpen = (publicId, sharpenStrength = 100) => {
  const image = cloudinary.image(publicId)

  image.adjust(sharpen().strength(sharpenStrength))

  return image.toURL()
}

export const colorizeImage = (
  publicId,
  levelIntensity = 50,
  colorType = '#ff0000'
) => {
  const image = cloudinary.image(publicId)

  image.effect(colorize().level(levelIntensity).color(colorType))

  return image.toURL()
}

export const blurImage = (publicId, blurStrength = 100) => {
  const image = cloudinary.image(publicId)

  image.adjust(blur().strength(blurStrength))

  return image.toURL()
}

export const removeBg = publicId => {
  const image = cloudinary.image(publicId)

  image.effect(backgroundRemoval())

  return image.toURL()
}
