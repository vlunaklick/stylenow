import UploadFile from '../UploadFile'

export default function Hero() {
  return (
    <>
      <section className="flex gap-6 py-16 px-4 sm:py-14 flex-col md:flex-row h-full">
        <section>
          <h2 className="text-5xl font-extrabold tracking-tight text-black md:text-6xl">
            <span className="block text-indigo-400">
              Edit your photo instantly!
            </span>
          </h2>
          <p className="mt-5 max-w-3xl text-md text-slate-600">
            Say goodbye to manual image editing with CropNow - the free online
            tool for effortless, perfect dimension and aspect ratio adjustments
            on your website, social media and beyond.
          </p>
        </section>

        <section>
          <UploadFile />
        </section>
      </section>
    </>
  )
}
