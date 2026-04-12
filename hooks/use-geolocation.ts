import { useEffect, useState } from 'react'

interface Location {
  latitude: number
  longitude: number
  accuracy: number
}

/**
 * useGeolocation - Hook for GPS/location tracking
 */
export function useGeolocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      setLoading(false)
      return
    }

    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      })
      setError(null)
      setLoading(false)
    }

    const errorHandler = (error: GeolocationPositionError) => {
      setError(error.message)
      setLoading(false)
    }

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
  }, [])

  return { location, error, loading }
}
