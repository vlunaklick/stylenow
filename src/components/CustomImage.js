import { useState, useEffect } from 'react'

export default function CustomImage({ src, className, ...args }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoading(false)
  }, [src])

  return (
    <>
      <img
        src={src}
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
