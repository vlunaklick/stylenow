import Link from 'next/link'
import { GitHub } from './icons/GitHub'

export default function Header() {
  return (
    <>
      <header className="max-w-3xl mx-auto py-2 px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 w-fit transition-transform hover:scale-105">
          <Link href="/">
            style
            <span className="text-indigo-500 text-xl">now</span>
          </Link>
        </h1>

        <Link
          href="https://github.com/vlunaklick/stylenow"
          className="text-sm font-medium hover:bg-indigo-600 transition-colors bg-indigo-500 px-2 py-1 rounded hidden min-[280px]:flex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-white fill-white text-xs font-medium transition-colors flex items-center">
            <GitHub className="w-5 h-5 inline-block mr-1" />
            Star on GitHub
          </span>
        </Link>
      </header>
    </>
  )
}
