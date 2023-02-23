import { useImage } from '@/context/Image'
import { useNavigation } from '@/hooks/useNavigation'

import { TEST_URLS } from '@/constants'

import SmallTestImage from '../SmallTestImage'

export default function SmallTry() {
  const { navigateToEditor } = useNavigation()

  const { setDataTest } = useImage()

  const handleUploadImage = src => {
    const publicID = src.split('/').pop().split('.')[0]
    setDataTest(publicID)
    navigateToEditor()
  }

  return (
    <section className="flex flex-row justify-center mt-4 gap-2 items-center">
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        <SmallTestImage
          onClick={() => handleUploadImage(TEST_URLS.gaming)}
          imgSrc={TEST_URLS.gaming}
          imgAlt="Test Image Gaming"
        />

        <SmallTestImage
          onClick={() => handleUploadImage(TEST_URLS.dogs)}
          imgSrc={TEST_URLS.dogs}
          imgAlt="Test Image Dogs"
        />

        <SmallTestImage
          onClick={() => handleUploadImage(TEST_URLS.landscape)}
          imgSrc={TEST_URLS.landscape}
          imgAlt="Test Image Landscape"
        />
      </div>
    </section>
  )
}
