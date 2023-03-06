/* eslint-disable @next/next/no-img-element */
import { useImage } from '@/context/Image'
import { useNavigation } from '@/hooks/useNavigation'

import { TEST_URLS } from '@/constants'

import TestImage from '@/components/TestImage'

export default function ClickToTry() {
  const { navigateToEditor } = useNavigation()

  const { handlePublicId } = useImage()

  const handleUploadImage = publicId => {
    handlePublicId(publicId)

    navigateToEditor()
  }

  return (
    <section className="flex flex-col justify-center w-full h-full px-4 relative">
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-50 w-fit">
        Click to try
      </h1>

      <div className="flex flex-row flex-wrap gap-4 justify-center w-full h-full mt-5">
        <TestImage
          onClick={() => handleUploadImage(TEST_URLS.gaming.publicId)}
          imgSrc={TEST_URLS.gaming.url}
          imgAlt="Test Image Gaming"
        />

        <TestImage
          onClick={() => handleUploadImage(TEST_URLS.dogs.publicId)}
          imgSrc={TEST_URLS.dogs.url}
          imgAlt="Test Image Dogs"
        />

        <TestImage
          onClick={() => handleUploadImage(TEST_URLS.landscape.publicId)}
          imgSrc={TEST_URLS.landscape.url}
          imgAlt="Test Image Landscape"
        />
      </div>

      <div className="absolute w-[50%] gradient-02 -z-10 opacity-30 inset-0 hidden dark:block" />
    </section>
  )
}
