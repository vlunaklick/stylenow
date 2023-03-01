export const unifyEffects = (currentUrl, newInfo) => {
  const currentEffects = getEffects(currentUrl)
  const newEffects = getEffects(newInfo)

  const start = currentUrl.indexOf('upload')
  const end = currentUrl.lastIndexOf('/v1')

  const newUrl =
    currentUrl.substring(0, start + 6) +
    currentEffects +
    newEffects +
    currentUrl.substring(end)

  return newUrl
}

export const getEffects = url => {
  const start = url.indexOf('upload')

  if (start === -1) {
    return ''
  }

  const end = url.lastIndexOf('/v1')

  if (end === -1) {
    return ''
  }

  return url.substring(start + 6, end)
}
