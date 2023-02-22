import UploadFile from './UploadFile'

export default function Hero() {
  return (
    <>
      <div className="flex gap-6 py-16 px-4 sm:py-14 flex-col md:flex-row h-full">
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-6xl">
            <span className="block text-indigo-400">
              Crop your photo instantly!
            </span>
          </h2>
          <p className="mt-5 max-w-3xl text-xl text-gray-600">
            CropNow is a free online tool for easy image cropping and resizing.
            Get perfect dimensions and aspect ratios for your website, social
            media, and more. Say goodbye to manual editing and try CropNow
            today!
          </p>
        </section>

        <section>
          <UploadFile />
        </section>
      </div>
    </>
  )
}
