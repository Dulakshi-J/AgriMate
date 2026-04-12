'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MicrophoneButton } from '@/components/microphone-button'
import { QuickActionsGrid } from '@/components/quick-actions-grid'
import { AgrimateLogo } from '@/components/agrimate-logo'
import { AlertTriangle, LogOut, Volume2, VolumeX, X } from 'lucide-react'

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
  const [hasAlert, setHasAlert] = useState(true)
  const [greeting, setGreeting] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  
  // Use ref to track if alert was already read this session (persists across re-renders)
  const alertReadRef = useRef(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

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

  // Auto-read critical alert using TTS (only once per session)
  useEffect(() => {
    if (hasAlert && !alertReadRef.current && !isSpeaking) {
      // Mark as read immediately to prevent re-triggering
      alertReadRef.current = true
      
      const alertText = 'Critical alert: Heavy rainfall expected tomorrow. Please check drainage channels.'
      if ('speechSynthesis' in window) {
        // Cancel any existing speech first
        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(alertText)
        utterance.rate = 0.9
        utteranceRef.current = utterance
        
        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)
        
        // Small delay to ensure cancel completed
        setTimeout(() => {
          window.speechSynthesis.speak(utterance)
        }, 100)
      }
    }
  }, [hasAlert, isSpeaking])

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

  const dismissAlert = () => {
    // Stop any ongoing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    setHasAlert(false)
  }
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
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
          <Link href="/">
            <button className="p-2 rounded-lg hover:bg-card transition-colors" aria-label="Logout">
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </Link>
        </div>
      </header>

      {/* Alert Banner with TTS */}
      {hasAlert && (
        <div className="border-b border-destructive bg-destructive/10 px-4 sm:px-6 py-3 animate-pulse">
          <div className="max-w-4xl mx-auto flex items-start gap-3 sm:gap-4">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Critical Alert: Heavy Rainfall</p>
              <p className="text-xs text-muted-foreground mt-1">Expected tomorrow morning. Check drainage now.</p>
              {isSpeaking && (
                <button 
                  onClick={stopSpeaking}
                  className="flex items-center gap-2 mt-2 hover:opacity-80 transition-opacity"
                >
                  <Volume2 className="w-4 h-4 text-destructive animate-pulse" />
                  <span className="text-xs text-destructive font-medium">Reading alert... (tap to stop)</span>
                </button>
              )}
            </div>
            <button
              onClick={dismissAlert}
              className="p-1 flex-shrink-0 hover:bg-destructive/20 rounded transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center gap-8 sm:gap-12">
        {/* Greeting */}
        <div className="text-center space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-foreground text-balance">
            {greeting}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-balance max-w-md mx-auto">
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
        <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-xs">
          🌾 Works completely offline. All data is saved locally and synced when connected.
        </p>
      </div>
    </main>
  )
}
