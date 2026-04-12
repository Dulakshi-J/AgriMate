'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MicrophoneButton } from '@/components/microphone-button'
import { QuickActionsGrid } from '@/components/quick-actions-grid'
import { AgrimateLogo } from '@/components/agrimate-logo'
import { AlertTriangle, LogOut, Bell, X } from 'lucide-react'

const ALERT_READ_KEY = 'agrimate_alert_read'
const ALERT_DISMISSED_KEY = 'agrimate_alert_dismissed'
const ALERT_TEXT = 'Critical alert: Heavy rainfall expected tomorrow. Please check drainage channels.'

// Helper to check sessionStorage (safe for SSR)
function getSessionValue(key: string): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(key) === 'true'
}

/**
 * Screen A1: Farmer Home
 * - Time-based greeting in local language
 * - Alert banner with auto-read TTS for critical alerts
 * - Pulsing microphone button as primary CTA
 * - Responsive layout for mobile and tablet
 */
export default function FarmerHome() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [showAlertBanner, setShowAlertBanner] = useState(false)
  const [greeting, setGreeting] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // There's always an alert available (in production: fetched from backend)
  const hasActiveAlert = true
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const hasAutoPlayedRef = useRef(false)

  // Initialize client-side state from sessionStorage
  useEffect(() => {
    setIsClient(true)
    // Only show banner if not previously dismissed this session
    const wasDismissed = getSessionValue(ALERT_DISMISSED_KEY)
    setShowAlertBanner(!wasDismissed)
  }, [])

  useEffect(() => {
    // Get time-based greeting
    const hour = new Date().getHours()
    let greetingText = ''
    if (hour < 12) greetingText = 'Good Morning'
    else if (hour < 18) greetingText = 'Good Afternoon'
    else greetingText = 'Good Evening'

    // In production: fetch from user profile for language preference
    const userName = 'Kumara'
    setGreeting(`${greetingText}, ${userName}`)
  }, [])

  // Function to speak the alert
  const speakAlert = useCallback(() => {
    if ('speechSynthesis' in window) {
      // Cancel any existing speech first
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(ALERT_TEXT)
      utterance.rate = 0.9
      utteranceRef.current = utterance
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        // Mark as read in sessionStorage
        sessionStorage.setItem(ALERT_READ_KEY, 'true')
      }
      utterance.onerror = () => setIsSpeaking(false)
      
      // Small delay to ensure cancel completed
      setTimeout(() => {
        window.speechSynthesis.speak(utterance)
      }, 100)
    }
  }, [])

  // Auto-read critical alert using TTS (only once per session)
  useEffect(() => {
    // Only run on client, only if banner is showing, and only if we haven't auto-played yet
    if (!isClient || hasAutoPlayedRef.current || !showAlertBanner) return
    
    const alreadyRead = getSessionValue(ALERT_READ_KEY)
    if (!alreadyRead && !isSpeaking) {
      hasAutoPlayedRef.current = true
      speakAlert()
    }
  }, [isClient, showAlertBanner, isSpeaking, speakAlert])

  // Cleanup: Cancel speech synthesis when navigating away
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setIsSpeaking(false)
    }
  }, [])

  const handleStartListening = () => {
    setIsListening(true)
    console.log('Starting to listen...')
    setTimeout(() => {
      router.push('/farmer/advisory')
    }, 2000)
  }

  const handleStopListening = () => {
    setIsListening(false)
    console.log('Stopped listening')
  }

  const dismissAlertBanner = () => {
    // Stop any ongoing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    setShowAlertBanner(false)
    // Mark banner as dismissed and alert as read
    sessionStorage.setItem(ALERT_DISMISSED_KEY, 'true')
    sessionStorage.setItem(ALERT_READ_KEY, 'true')
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AgrimateLogo size={40} />
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground">AgriMate</h1>
              <p className="text-xs text-muted-foreground">Farmer Mode</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Notification Bell - links to alert details page */}
            <Link href="/farmer/alert">
              <button 
                className="p-2 rounded-lg hover:bg-card transition-colors relative"
                aria-label="View alerts"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {/* Notification dot when there's an active alert */}
                {hasActiveAlert && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </button>
            </Link>
            <Link href="/">
              <button className="p-2 rounded-lg hover:bg-card transition-colors" aria-label="Logout">
                <LogOut className="w-5 h-5 text-muted-foreground" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Alert Banner - only shows once per session until dismissed */}
      {showAlertBanner && (
        <Link href="/farmer/alert">
          <div className={`border-b border-destructive bg-destructive/10 px-4 sm:px-6 py-3 cursor-pointer hover:bg-destructive/15 transition-colors ${isSpeaking ? 'animate-pulse' : ''}`}>
            <div className="max-w-4xl mx-auto flex items-start gap-3 sm:gap-4">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Critical Alert: Heavy Rainfall</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isSpeaking ? 'Reading aloud...' : 'Tap to view details'}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  dismissAlertBanner()
                }}
                className="p-1 flex-shrink-0 hover:bg-destructive/20 rounded transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="w-5 h-5 text-destructive" />
              </button>
            </div>
          </div>
        </Link>
      )}

      {/* Main content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10">
        {/* Greeting */}
        <div className="text-center space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-foreground text-balance">
            {greeting}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground text-balance max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
            Ask me anything about your farm. Get instant advice on weather, irrigation, pests, and more.
          </p>
        </div>

        {/* Microphone Button */}
        <MicrophoneButton
          isListening={isListening}
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
        />

        {/* Quick Actions */}
        <QuickActionsGrid />

        {/* Footer hint */}
        <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-xs sm:max-w-sm">
          Works completely offline. All data is saved locally and synced when connected.
        </p>
      </div>
    </main>
  )
}
