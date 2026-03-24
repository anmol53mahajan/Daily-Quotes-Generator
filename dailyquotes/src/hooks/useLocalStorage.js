import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const rawValue = window.localStorage.getItem(key)
      return rawValue ? JSON.parse(rawValue) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    // Keep localStorage in sync whenever this state changes.
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
