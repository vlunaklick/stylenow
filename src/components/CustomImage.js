import { useState, useEffect } from 'react'

export default function CustomImage({ src, ...args }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoading(false)
  }, [src])

  if (loading) {
    return (
      <div className="w-96 aspect-video bg-gray-300 animate-pulse rounded-lg" />
    )
  }

  return (
    <>
      <img src={src} {...args} />
    </>
  )
}
