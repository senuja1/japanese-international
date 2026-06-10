// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// src/hooks/useDebounce.js
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// src/hooks/usePagination.js
import { useState, useMemo } from 'react'

export function usePagination(items, perPage = 10) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(items.length / perPage)
  const paginated = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage]
  )

  const reset = () => setPage(1)

  return { page, setPage, paginated, totalPages, reset }
}

// src/hooks/useSearch.js
import { useState, useMemo } from 'react'
import { useDebounce } from './useDebounce'

export function useSearch(items, fields = []) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 200)

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return items
    const q = debouncedQuery.toLowerCase()
    return items.filter(item =>
      fields.some(field => {
        const val = field.split('.').reduce((o, k) => o?.[k], item)
        return String(val || '').toLowerCase().includes(q)
      })
    )
  }, [items, debouncedQuery, fields])

  return { query, setQuery, results }
}

// src/hooks/useToast.js
import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}
