import { useRouter } from 'next/router'

export function useNavigation() {
  const router = useRouter()

  const navigateToEditor = () => {
    router.push('/editor')
  }

  const navigateToHome = () => {
    router.push('/')
  }

  return {
    navigateToEditor,
    navigateToHome,
  }
}
