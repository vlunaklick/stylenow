import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="max-w-3xl mx-auto py-2 px-4">
        <h1 className="text-3xl font-bold text-slate-900 w-fit transition-transform hover:scale-105">
          <Link href="/">
            crop
            <span className="text-indigo-500 text-xl">now</span>
          </Link>
        </h1>
      </header>
    </>
  )
}
