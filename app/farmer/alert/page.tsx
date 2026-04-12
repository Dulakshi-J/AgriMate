'use client'

import Link from 'next/link'
import { AlertTriangle, CloudRain, Wind, ArrowLeft, Clock } from 'lucide-react'
import { useState } from 'react'

/**
 * Screen A4: Climate Alert
 * - High-priority push notification override
 * - Pre-loaded icon assets for instant rendering
 * - Snooze logic: sets system alarm/local notification timer
 * - Responsive action-oriented layout
 */
export default function ClimateAlert() {
  const [snoozed, setSnoozed] = useState(false)
  const [snoozeTime, setSnoozeTime] = useState<number | null>(null)

  // Mock alert data - in production, fetched from push notification or local database
  const alert = {
    threat: 'Heavy Rainfall',
    severity: 'critical',
    startTime: 'Tomorrow 2:00 PM',
    duration: '6 hours',
    expectedRainfall: '45-60mm',
    instructions: [
      {
        step: 1,
        title: 'Ensure Drainage',
        description: 'Check field drainage channels are clear of debris and water can flow freely',
      },
      {
        step: 2,
        title: 'Delay Irrigation',
        description: 'Skip watering today and tomorrow morning to prevent waterlogging',
      },
      {
        step: 3,
        title: 'Protect Young Crops',
        description: 'Cover or prop up fragile seedlings if available, stake tall plants',
      },
      {
        step: 4,
        title: 'Monitor Closely',
        description: 'After rainfall, check soil drainage and crop damage within 24 hours',
      },
    ],
  }

  const handleSnooze = (minutes: number) => {
    setSnoozed(true)
    setSnoozeTime(minutes)
    // In production: Set system alarm using Notification API
    // setTimeout(() => {
    //   showNotification(alert.threat)
    //   setSnoozed(false)
    // }, minutes * 60 * 1000)
    console.log(`Alert snoozed for ${minutes} minutes`)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-destructive bg-destructive/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/farmer">
            <button
              className="p-2 rounded-lg hover:bg-destructive/20 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-destructive" />
            </button>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-destructive">Alert</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Snoozed notification */}
        {snoozed && (
          <div className="rounded-lg bg-primary/10 border border-primary p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Alert Snoozed</p>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll remind you in {snoozeTime} minutes
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alert Banner */}
        <div className="rounded-lg bg-destructive/10 border-2 border-destructive p-4 sm:p-6 space-y-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-destructive">{alert.threat}</h2>
              <p className="text-sm text-muted-foreground mt-2">Severe weather warning</p>
            </div>
          </div>

          {/* Alert Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-background/50 rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">When</p>
              <p className="font-semibold text-foreground">{alert.startTime}</p>
            </div>
            <div className="bg-background/50 rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="font-semibold text-foreground">{alert.duration}</p>
            </div>
            <div className="bg-background/50 rounded p-3 sm:col-span-2">
              <p className="text-xs text-muted-foreground mb-2">Expected Rainfall</p>
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="font-semibold text-foreground">{alert.expectedRainfall}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-poppins text-foreground">What to do now</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {alert.instructions.map((instruction) => (
              <div key={instruction.step} className="flex gap-3 p-4 rounded-lg bg-card border border-border">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{instruction.step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{instruction.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{instruction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Snooze Options */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Set reminder</p>
          <div className="grid grid-cols-3 gap-2">
            {[30, 60, 240].map((minutes) => (
              <button
                key={minutes}
                onClick={() => handleSnooze(minutes)}
                disabled={snoozed}
                className="px-3 py-2 rounded-lg bg-card border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm transition-colors"
              >
                {minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h`}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors">
            Mark as Read
          </button>
          <Link href="/farmer" className="flex-1">
            <button className="w-full h-12 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors">
              Dismiss for 24h
            </button>
          </Link>
        </div>

        {/* Footer */}
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
