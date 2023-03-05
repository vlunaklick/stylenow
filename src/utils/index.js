export const getImageFileSize = async src => {
  const blob = await fetch(src).then(r => r.blob())
  const { size } = blob

  return size
}
