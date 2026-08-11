import { useState, useEffect } from 'react'

export function useViewTransition(key: string, delay = 900) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), delay)
    return () => clearTimeout(timer)
  }, [key, delay])

  return isLoading
}