'use client'

import Link from 'next/link'
import { AudioPlayer } from '@/components/audio-player'
import { ArrowLeft, Copy, CheckCircle, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'

/**
 * Screen A3: Advisory Result
 * - Media player with speed control (0.75x, 1x, 1.5x)
 * - Transcript display with copy functionality
 * - Save to Favorites for offline replay
 * - Fallback for offline: "Saved. We will answer when you reach a signal zone"
 * - Responsive layout for mobile and tablet
 */
export default function AdvisoryResult() {
  const [copied, setCopied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  // Mock advisory data
  const advisory = {
    title: 'Irrigation Recommendation',
    timestamp: 'Just now',
    query: 'When should I water my rice field?',
    transcript:
      'Based on current soil moisture levels and weather forecast, I recommend irrigating your northern field tomorrow morning between 6 and 8 AM. This will help your crops prepare for the heavy rain expected tomorrow afternoon. Monitor the soil moisture closely - if it reaches 70%, reduce irrigation frequency.',
    audioUrl: undefined, // Would be a real audio URL in production
    isOffline: false,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(advisory.transcript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveToFavorites = () => {
    // Save to local database: Saved_Advisories table
    setIsSaved(true)
    // Show toast notification
    console.log('Advisory saved to favorites')
  }

  const speeds = [0.75, 1, 1.5]

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/farmer">
            <button className="p-2 rounded-lg hover:bg-card transition-colors" aria-label="Go back">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground">Advisory</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Offline notification */}
        {advisory.isOffline && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 text-center">
            <p className="text-sm font-semibold text-foreground">Saved offline</p>
            <p className="text-xs text-muted-foreground mt-1">We will answer when you reach a signal zone</p>
          </div>
        )}

        {/* Title & Status */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-foreground">{advisory.title}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Your Question: {advisory.query}</p>
              <p className="text-xs text-muted-foreground mt-1">{advisory.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Audio Player with Speed Control */}
        {advisory.audioUrl ? (
          <div className="rounded-lg bg-card border border-border p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm font-semibold text-foreground">Listen to the advice</p>
              <div className="flex gap-2 flex-wrap">
                {speeds.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border text-foreground hover:border-primary'
                    }`}
                    aria-label={`Playback speed ${speed}x`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
            <AudioPlayer audioUrl={advisory.audioUrl} autoPlay={false} />
          </div>
        ) : (
          <div className="rounded-lg bg-card/50 border border-border/50 border-dashed p-6 sm:p-8 text-center">
            <p className="text-sm text-muted-foreground">Audio generation coming soon</p>
          </div>
        )}

        {/* Transcript */}
        <div className="rounded-lg bg-card border border-border p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Full Transcript</p>
            <button
              onClick={handleCopy}
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
          <p className="text-sm leading-relaxed text-foreground bg-background/50 rounded p-4">
            {advisory.transcript}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSaveToFavorites}
            className={`flex-1 h-12 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              isSaved
                ? 'bg-primary/20 text-primary border border-primary'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save to Favorites'}
          </button>
          <button className="flex-1 h-12 rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <Link href="/farmer" className="flex-1">
            <button className="w-full h-12 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors">
              Ask Another
            </button>
          </Link>
        </div>

        {/* Footer link */}
        <div className="text-center pt-4">
          <Link href="/farmer">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors font-semibold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
