import { useState, useEffect } from 'react'

const STORAGE_KEY = 'finance-tracker-user-name'

export function useUserName() {
  const [name, setName] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      if (name) localStorage.setItem(STORAGE_KEY, name)
    } catch {
      // non-critical — name isn't financial data, silently skip
    }
  }, [name])

  return { name, setName }
}