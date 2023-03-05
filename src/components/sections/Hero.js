import UploadFile from '../UploadFile'

export default function Hero() {
  return (
    <>
      <div className="flex gap-6 py-16 px-4 sm:py-14 flex-col md:flex-row h-full items-center relative">
        <section>
          <h2 className="text-5xl font-extrabold tracking-tight text-black md:text-6xl dark:text-white">
            <span className="block text-indigo-400">
              Edit your photo instantly!
            </span>
          </h2>
          <p className="mt-5 max-w-3xl text-md text-slate-600 dark:text-slate-400">
            Say goodbye to manual image editing with StyleNow - the free online
            tool for effortless, perfect dimension and aspect ratio adjustments
            on your website, social media and beyond.
          </p>
        </section>

        <section>
          <UploadFile />
        </section>
      </div>
    </>
  )
}
