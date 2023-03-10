import { useTheme } from 'next-themes'

export default function ButtonTheme() {
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 min-[400px]:w-10 min-[400px]:h-10"
      onClick={handleTheme}
    >
      <span className="sr-only">Change theme</span>
      <span className="text-gray-800 dark:text-gray-200 min-[400px]:text-base text-xs">
        {theme === 'light' ? '🌞' : '🌚'}
      </span>
    </button>
  )
}
