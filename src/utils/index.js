export const getImageFileSize = async file => {
  const blob = await fetch(file.src).then(r => r.blob())
  const { size } = blob

  return size
}
