'use client'

import Link from 'next/link'
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Volume2, AlertTriangle } from 'lucide-react'
import { useState, useEffect } from 'react'

/**
 * 7-Day Weather Forecast with Farming Recommendations
 * - Weather visualization for each day
 * - Farming tips based on weather conditions
 * - Audio playback for low-literacy users
 * - Irrigation and crop care suggestions
 */
export default function FarmerForecast() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const forecast = [
    { 
      day: 'Today', 
      date: 'Apr 12',
      high: 28, 
      low: 22, 
      condition: 'Sunny', 
      icon: Sun,
      humidity: 65,
      windSpeed: 8,
      rainChance: 10,
      farmingTip: 'Good day for field work. Water crops in early morning to reduce evaporation.',
    },
    { 
      day: 'Tomorrow', 
      date: 'Apr 13',
      high: 26, 
      low: 20, 
      condition: 'Heavy Rain', 
      icon: CloudRain,
      humidity: 85,
      windSpeed: 15,
      rainChance: 90,
      farmingTip: 'Skip irrigation today. Check drainage channels are clear. Secure any loose materials.',
      isAlert: true,
    },
    { 
      day: 'Wed', 
      date: 'Apr 14',
      high: 25, 
      low: 19, 
      condition: 'Cloudy', 
      icon: Cloud,
      humidity: 75,
      windSpeed: 10,
      rainChance: 40,
      farmingTip: 'Check fields for waterlogging after rain. Good conditions for transplanting.',
    },
    { 
      day: 'Thu', 
      date: 'Apr 15',
      high: 29, 
      low: 23, 
      condition: 'Sunny', 
      icon: Sun,
      humidity: 60,
      windSpeed: 6,
      rainChance: 5,
      farmingTip: 'Resume normal irrigation. Apply fertilizer if soil is moist from recent rain.',
    },
    { 
      day: 'Fri', 
      date: 'Apr 16',
      high: 30, 
      low: 24, 
      condition: 'Sunny', 
      icon: Sun,
      humidity: 55,
      windSpeed: 5,
      rainChance: 5,
      farmingTip: 'Hot day expected. Water crops early morning or late evening.',
    },
    { 
      day: 'Sat', 
      date: 'Apr 17',
      high: 28, 
      low: 22, 
      condition: 'Partly Cloudy', 
      icon: Cloud,
      humidity: 65,
      windSpeed: 8,
      rainChance: 20,
      farmingTip: 'Good conditions for pest inspection. Check under leaves for signs of damage.',
    },
    { 
      day: 'Sun', 
      date: 'Apr 18',
      high: 27, 
      low: 21, 
      condition: 'Cloudy', 
      icon: Cloud,
      humidity: 70,
      windSpeed: 12,
      rainChance: 35,
      farmingTip: 'Moderate conditions. Good day for weeding and field maintenance.',
    },
  ]

  const playForecastSummary = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()

      if (isPlaying) {
        setIsPlaying(false)
        return
      }

      const summaryText = forecast.map((day, idx) => {
        if (idx === 0) return `Today: ${day.condition}, high of ${day.high} degrees. ${day.farmingTip}`
        if (idx === 1) return `Tomorrow: ${day.condition}, high of ${day.high} degrees. ${day.farmingTip}`
        return `${day.day}: ${day.condition}, high of ${day.high} degrees.`
      }).join('. ')

      const utterance = new SpeechSynthesisUtterance(summaryText)
      utterance.rate = 0.9
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/farmer">
              <button className="p-2 rounded-lg hover:bg-card transition-colors" aria-label="Go back">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground">7-Day Forecast</h1>
              <p className="text-xs text-muted-foreground">With farming recommendations</p>
            </div>
          </div>
          <button
            onClick={playForecastSummary}
            className={`p-3 rounded-full transition-colors ${
              isPlaying 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-primary/20 text-primary hover:bg-primary/30'
            }`}
            aria-label={isPlaying ? 'Stop reading' : 'Read forecast aloud'}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
        {/* Alert for tomorrow's rain */}
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground text-sm">Heavy Rain Tomorrow</p>
            <p className="text-xs text-muted-foreground mt-1">
              Prepare your fields today. Check drainage and delay irrigation.
            </p>
          </div>
        </div>

        {/* Forecast cards */}
        <div className="space-y-3">
          {forecast.map((day, idx) => {
            const Icon = day.icon
            const isExpanded = selectedDay === idx
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(isExpanded ? null : idx)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  day.isAlert 
                    ? 'bg-destructive/10 border-destructive/30' 
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      day.isAlert ? 'bg-destructive/20' : 'bg-primary/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${day.isAlert ? 'text-destructive' : 'text-primary'}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{day.day}</p>
                        <span className="text-xs text-muted-foreground">{day.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{day.condition}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-foreground text-lg">{day.high}°</p>
                    <p className="text-xs text-muted-foreground">{day.low}°</p>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    {/* Weather details */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-background rounded">
                        <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Rain</p>
                        <p className="text-sm font-semibold text-foreground">{day.rainChance}%</p>
                      </div>
                      <div className="p-2 bg-background rounded">
                        <Cloud className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Humidity</p>
                        <p className="text-sm font-semibold text-foreground">{day.humidity}%</p>
                      </div>
                      <div className="p-2 bg-background rounded">
                        <Wind className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Wind</p>
                        <p className="text-sm font-semibold text-foreground">{day.windSpeed} km/h</p>
                      </div>
                    </div>

                    {/* Farming tip */}
                    <div className={`p-3 rounded ${day.isAlert ? 'bg-destructive/5' : 'bg-primary/5'}`}>
                      <p className="text-xs font-semibold text-foreground mb-1">Farming Tip:</p>
                      <p className="text-xs text-muted-foreground">{day.farmingTip}</p>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Tap any day to see detailed weather and farming recommendations
          </p>
        </div>
      </div>
    </main>
  )
}
