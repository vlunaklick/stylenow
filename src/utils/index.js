export const convertToImageSrc = async file => {
  const src = URL.createObjectURL(file)

  return src
}
