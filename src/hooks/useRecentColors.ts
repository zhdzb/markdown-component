import { useState, useEffect } from 'react'
import { setLocalStorage, getLocalStorage } from '@/utils/localstorage'

export interface RecentColor {
  type: 'text' | 'highlight'
  value: string
}

export const useRecentColors = () => {
  const [recentColors, setRecentColors] = useState<RecentColor[]>([])

  useEffect(() => {
    const stored = getLocalStorage('recentColors')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setRecentColors(parsed)
        }
      } catch (e) {
        console.error('Failed to parse recent colors', e)
      }
    }
  }, [])

  const addRecentColor = (value: string, type: 'text' | 'highlight') => {
    if (!value) return

    setRecentColors(prev => {
      const filtered = prev.filter(c => !(c.type === type && c.value === value))
      const newColors = [{ type, value }, ...filtered].slice(0, 4)
      setLocalStorage('recentColors', JSON.stringify(newColors))
      return newColors
    })
  }

  return { recentColors, addRecentColor }
}
