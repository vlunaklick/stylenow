import { Cloudinary } from './icons/Cloudinary.js'

export default function Footer() {
  return (
    <footer className="p-4">
      <div className="max-w-3xl mx-auto w-full px-4 py-4 flex justify-between items-center border-slate-200 rounded-md bg-white border flex-col gap-2 sm:flex-row dark:bg-slate-900 dark:border-slate-800">
        <div className="flex gap-4 items-center">
          <p className="sm:text-sm text-xs text-slate-500 text-center dark:text-slate-400">
            Made with{' '}
            <span aria-label="love" role="img">
              💙
            </span>{' '}
            for{' '}
            <a
              className="text-[#09f] font-bold border-b border-transparent hover:border-[#09f]"
              href="https://www.twitch.tv/midudev"
              rel="noreferrer"
              target="_blank"
            >
              @midudev
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-1 items-center min-[220px]:flex-row">
          <p className="sm:text-sm text-xs text-slate-500 text-center dark:text-slate-400">
            Powered by{' '}
          </p>
          <a href="https://cloudinary.com/" rel="noreferrer" target="_blank">
            <Cloudinary className="w-20 sm:w-24" />
          </a>
        </div>
      </div>
    </footer>
  )
}
