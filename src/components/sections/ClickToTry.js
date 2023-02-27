/* eslint-disable @next/next/no-img-element */
import { useImage } from '@/context/Image'
import { useNavigation } from '@/hooks/useNavigation'

import { TEST_URLS } from '@/constants'

import TestImage from '@/components/TestImage'

export default function ClickToTry() {
  const { navigateToEditor } = useNavigation()

  const { handlePublicId } = useImage()

  const handleUploadImage = src => {
    const publicID = src.split('/').pop().split('.')[0]
    handlePublicId(publicID)
    navigateToEditor()
  }

  return (
    <section className="flex flex-col justify-center w-full h-full px-4">
      <h1 className="text-2xl font-semibold text-slate-800">Click to try</h1>

      <div className="flex flex-row flex-wrap gap-4 justify-center w-full h-full mt-5">
        <TestImage
          onClick={() => handleUploadImage(TEST_URLS.gaming)}
          imgSrc={TEST_URLS.gaming}
          imgAlt="Test Image Gaming"
        />

        <TestImage
          onClick={() => handleUploadImage(TEST_URLS.dogs)}
          imgSrc={TEST_URLS.dogs}
          imgAlt="Test Image Dogs"
        />

        <TestImage
          onClick={() => handleUploadImage(TEST_URLS.landscape)}
          imgSrc={TEST_URLS.landscape}
          imgAlt="Test Image Landscape"
        />
      </div>
    </section>
  )
}
