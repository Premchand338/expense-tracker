import { useState, useEffect } from 'react'

const STORAGE_KEY = 'finance-tracker-theme'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    } catch {
      // non-critical
    }
  }, [isDark])

  return { isDark, toggleTheme: () => setIsDark((v) => !v) }
}