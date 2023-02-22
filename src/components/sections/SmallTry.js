import { useImage } from '@/context/Image'
import { useNavigation } from '@/hooks/useNavigation'

import gaming from '@/assets/gaming.webp'
import dogs from '@/assets/dogs.webp'
import landscape from '@/assets/landscape.jpeg'

import SmallTestImage from '../SmallTestImage'

export default function SmallTry() {
  const { navigateToEditor } = useNavigation()

  const { setFile, setImageURL } = useImage()

  const handleUploadImage = e => {
    setImageURL(e)
    setFile(e.src)
    navigateToEditor()
  }

  return (
    <section className="flex flex-row justify-center mt-4 gap-2 items-center">
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        <SmallTestImage
          onClick={() => handleUploadImage(gaming)}
          imgSrc={gaming.src}
          imgAlt="Test Image Gaming"
        />

        <SmallTestImage
          onClick={() => handleUploadImage(dogs)}
          imgSrc={dogs.src}
          imgAlt="Test Image Dogs"
        />

        <SmallTestImage
          onClick={() => handleUploadImage(landscape)}
          imgSrc={landscape.src}
          imgAlt="Test Image Landscape"
        />
      </div>
    </section>
  )
}
