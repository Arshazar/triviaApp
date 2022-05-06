import { useEffect, useState } from 'react'

import { storage } from '../utils'

const useTheme = () => {
  const [themeState, setThemeState] = useState<string>('light')

  const setTheme = async (v: string) => {
    await storage.save({ key: 'theme', data: v })
    setThemeState(v)
  }

  useEffect(() => {
    storage
      .load({ key: 'theme' })
      .then((data) => setThemeState(data))
      .catch(() => {
        console.log('no saved theme found')
        if (typeof window !== 'undefined') {
          setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        }
      })
  }, [])

  return {
    theme: themeState,
    setTheme
  }
}

export { useTheme }
