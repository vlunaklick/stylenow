import { useState, useEffect } from 'react'

export default function CustomImage({ src, className, ...args }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!src) return

    const img = new Image()
    img.src = src
    img.onload = () => setLoading(false)
  }, [src])

  const placeholder =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"%3E%3C/svg%3E'

  return (
    <>
      <img
        src={loading ? placeholder : src}
        className={
          loading
            ? 'w-96 aspect-video bg-slate-300 animate-pulse rounded-lg mx-auto'
            : className
        }
        {...args}
      />
    </>
  )
}
