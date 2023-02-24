import Hero from '@/components/sections/Hero'
import ClickToTry from '@/components/sections/ClickToTry'

export default function Home() {
  return (
    <>
      <main className="max-w-3xl mx-auto mt-4 w-full">
        <Hero />
        <ClickToTry />
      </main>
    </>
  )
}
