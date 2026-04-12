import { useEffect, useState } from 'react'

/**
 * useOffline - Hook to detect offline mode
 */
export function useOffline() {
  const [isOffline, setIsOffline] = useState(false)
  const [pendingSync, setPendingSync] = useState(0)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial status
    setIsOffline(!navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOffline, pendingSync, setPendingSync }
}
