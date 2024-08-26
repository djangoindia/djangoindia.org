'use client'
import { useEffect, useState } from 'react'

const useWidth = () => {
  const [width, setWidth] = useState<number>(767)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)

      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return width
}

export default useWidth
