/* eslint-disable @next/next/no-img-element */
import { useImage } from '@/context/Image'
import { useNavigation } from '@/hooks/useNavigation'

import gaming from '@/assets/gaming.webp'
import dogs from '@/assets/dogs.webp'
import landscape from '@/assets/landscape.jpeg'

import TestImage from '@/components/TestImage'

export default function ClickToTry() {
  const { navigateToEditor } = useNavigation()

  const { setFile, setImageURL } = useImage()

  const handleUploadImage = e => {
    setImageURL(e)
    setFile(e.src)
    navigateToEditor()
  }

  return (
    <section className="flex flex-col justify-center w-full h-full px-4">
      <h1 className="text-2xl font-semibold text-slate-800">Click to try</h1>

      <div className="flex flex-row flex-wrap gap-4 justify-center w-full h-full mt-5">
        <TestImage
          onClick={() => handleUploadImage(gaming)}
          imgSrc={gaming.src}
          imgAlt="Test Image Gaming"
        />

        <TestImage
          onClick={() => handleUploadImage(dogs)}
          imgSrc={dogs.src}
          imgAlt="Test Image Dogs"
        />

        <TestImage
          onClick={() => handleUploadImage(landscape)}
          imgSrc={landscape.src}
          imgAlt="Test Image Landscape"
        />
      </div>
    </section>
  )
}
