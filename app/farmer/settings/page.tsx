'use client'

import Link from 'next/link'
import { ArrowLeft, Globe, Volume2, Bell, Shield, Moon, Sun, Smartphone, Check } from 'lucide-react'
import { useState } from 'react'

/**
 * Farmer Settings Page
 * - Language selection (multilingual requirement from PDF)
 * - Voice/TTS preferences
 * - Notification settings
 * - Data privacy controls (blockchain consent)
 * - Accessibility features
 */
export default function FarmerSettings() {
  const [language, setLanguage] = useState('english')
  const [voiceSpeed, setVoiceSpeed] = useState(1)
  const [autoReadAlerts, setAutoReadAlerts] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [dataConsent, setDataConsent] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [largeText, setLargeText] = useState(false)

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'hindi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'sinhala', name: 'Sinhala', native: 'සිංහල' },
  ]

  const voiceSpeeds = [
    { value: 0.75, label: 'Slow' },
    { value: 1, label: 'Normal' },
    { value: 1.5, label: 'Fast' },
  ]

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
          <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground">Settings</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Language Selection - Key multilingual requirement */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold font-poppins text-foreground">Language / भाषा</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Select your preferred language. All voice alerts and text will be in this language.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                  language === lang.code
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{lang.native}</p>
                    <p className="text-xs text-muted-foreground">{lang.name}</p>
                  </div>
                  {language === lang.code && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Voice Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold font-poppins text-foreground">Voice Settings</h2>
          </div>
          
          {/* Voice Speed */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-3">
            <p className="text-sm font-semibold text-foreground">Speech Speed</p>
            <div className="flex gap-2">
              {voiceSpeeds.map((speed) => (
                <button
                  key={speed.value}
                  onClick={() => setVoiceSpeed(speed.value)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    voiceSpeed === speed.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-read alerts toggle */}
          <div className="p-4 rounded-lg bg-card border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Auto-read Critical Alerts</p>
              <p className="text-xs text-muted-foreground mt-1">Automatically speak weather alerts aloud</p>
            </div>
            <button
              onClick={() => setAutoReadAlerts(!autoReadAlerts)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                autoReadAlerts ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label="Toggle auto-read alerts"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  autoReadAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold font-poppins text-foreground">Notifications</h2>
          </div>
          
          <div className="p-4 rounded-lg bg-card border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground mt-1">Receive weather alerts and advisories</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                notifications ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label="Toggle notifications"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Data Privacy - Blockchain consent (key requirement) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold font-poppins text-foreground">Data Privacy</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your data is encrypted and stored securely. All access is recorded on blockchain for transparency.
          </p>
          
          <div className="p-4 rounded-lg bg-card border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Share Data with Extension Officers</p>
                <p className="text-xs text-muted-foreground mt-1">Allow officers to view your farm data for better advice</p>
              </div>
              <button
                onClick={() => setDataConsent(!dataConsent)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  dataConsent ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label="Toggle data sharing"
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                    dataConsent ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {dataConsent && (
              <div className="p-3 bg-primary/10 border border-primary/30 rounded text-xs">
                <p className="font-semibold text-foreground">Consent Recorded on Blockchain</p>
                <p className="text-muted-foreground mt-1">
                  Your permission is securely logged. You can revoke access anytime.
                </p>
              </div>
            )}
          </div>

          <button className="w-full p-3 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-card transition-colors">
            View Data Access History
          </button>
        </section>

        {/* Accessibility */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold font-poppins text-foreground">Accessibility</h2>
          </div>
          
          <div className="p-4 rounded-lg bg-card border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Large Text</p>
              <p className="text-xs text-muted-foreground mt-1">Increase text size for easier reading</p>
            </div>
            <button
              onClick={() => setLargeText(!largeText)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                largeText ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label="Toggle large text"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  largeText ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* App Info */}
        <section className="pt-4 border-t border-border">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold text-foreground">AgriMate v1.0</p>
            <p className="text-xs text-muted-foreground">
              Offline-first agricultural assistant for climate-resilient farming
            </p>
            <p className="text-xs text-muted-foreground">
              All data syncs automatically when connected
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
