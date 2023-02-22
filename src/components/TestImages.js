/* eslint-disable @next/next/no-img-element */
import { useImage } from '@/context/Image'

import gaming from '@/assets/gaming.webp'
import dogs from '@/assets/dogs.webp'
import landscape from '@/assets/landscape.jpeg'

const buttonClass =
  'w-full h-full border-2 border-gray-200 rounded-lg flex-1 min-w-[200px]'
const imagesClass = 'w-full object-cover rounded-md'

export default function TestImages() {
  const { setFile, setImageURL } = useImage()

  const handleUploadImage = e => {
    setImageURL(e)
    setFile(e.src)
  }

  return (
    <section className="flex flex-col justify-center w-full h-full px-4">
      <h1 className="text-2xl font-semibold text-slate-800">Test Images</h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center w-full h-full mt-5">
        <button
          onClick={() => handleUploadImage(gaming)}
          className={buttonClass}
        >
          <img
            src={gaming.src}
            alt="Test Image Gaming"
            className={imagesClass}
            loading="lazy"
            draggable="false"
          />
        </button>

        <button onClick={() => handleUploadImage(dogs)} className={buttonClass}>
          <img
            src={dogs.src}
            alt="Test Image Dogs"
            className={imagesClass}
            loading="lazy"
            draggable="false"
          />
        </button>

        <button
          onClick={() => handleUploadImage(landscape)}
          className={buttonClass}
        >
          <img
            src={landscape.src}
            alt="Test Image Landscape"
            className={imagesClass}
            loading="lazy"
            draggable="false"
          />
        </button>
      </div>
    </section>
  )
}
