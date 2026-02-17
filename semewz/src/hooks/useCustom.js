import { useState, useCallback, useEffect } from 'react'

/**
 * Custom hook for managing loading states
 * @returns {object} - Loading state and handlers
 */
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState)

  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}

/**
 * Custom hook for managing async operations
 * @param {function} asyncFunction - Async function to execute
 * @returns {object} - Data, loading state, error, and execute function
 */
export function useAsync(asyncFunction) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(async (...args) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await asyncFunction(...args)
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [asyncFunction])

  return {
    data,
    error,
    isLoading,
    execute,
  }
}

/**
 * Custom hook for localStorage persistence
 * @param {string} key - LocalStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {array} - [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' && window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

/**
 * Custom hook for detecting clicks outside an element
 * @param {React.Ref} ref - Reference to the element
 * @returns {boolean} - Whether user clicked outside
 */
export function useClickOutside(ref) {
  const [isClickedOutside, setIsClickedOutside] = useState(false)

  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsClickedOutside(true)
    } else {
      setIsClickedOutside(false)
    }
  }, [ref])

  return isClickedOutside
}

/**
 * Custom hook for media queries
 * @param {string} query - Media query string
 * @returns {boolean} - Whether media query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const listener = (e) => setMatches(e.matches)
    mediaQueryList.addListener(listener)
    return () => mediaQueryList.removeListener(listener)
  }, [query])

  return matches
}
