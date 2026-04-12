'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SyncStatusBanner } from '@/components/sync-status-banner'
import { ArrowLeft, Camera, Mic, AlertCircle, CheckCircle, Shield, X } from 'lucide-react'
import { useState } from 'react'

/**
 * Screen B4: Smart Data Collection
 * - Offline-first form by default, no sync until manual action
 * - Media capture: photo + voice note (stored locally as Blob)
 * - Dropdowns populated from static JSON config
 * - Save & Next: creates JSON object, writes to Pending_Sync_Queue, clears form
 * - Responsive layout for field use on tablets/phones
 */
export default function DataCollection() {
  const params = useParams()
  const farmId = params.id as string

  const [isOffline] = useState(false)
  const [formData, setFormData] = useState({
    cropHealth: 'good',
    pestPresence: 'none',
    waterLevel: 'adequate',
    soilColor: 'brown',
    notes: '',
    photos: [] as string[],
    voiceNotes: [] as string[],
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [photoCount, setPhotoCount] = useState(0)
  const [voiceCount, setVoiceCount] = useState(0)
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)
  const [consentHash, setConsentHash] = useState<string | null>(null)

  // Static dropdown options from JSON config
  const dropdownOptions = {
    cropHealth: ['Excellent', 'Good', 'Fair', 'Poor'],
    pestPresence: ['None', 'Minor', 'Moderate', 'Severe'],
    waterLevel: ['Flooded', 'Adequate', 'Low', 'Critical'],
    soilColor: ['Black', 'Brown', 'Red', 'Grey'],
  }

  const handleTakePhoto = () => {
    // In production: Use device camera API
    setPhotoCount((prev) => prev + 1)
    console.log('Photo captured and saved locally')
  }

  const handleRecordVoice = () => {
    if (!isRecording) {
      setIsRecording(true)
      setRecordingTime(0)
      // In production: Use Web Audio API to record
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            clearInterval(interval)
            setIsRecording(false)
            setVoiceCount((v) => v + 1)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      setIsRecording(false)
      setVoiceCount((prev) => prev + 1)
      setRecordingTime(0)
    }
  }

  const handleSaveAndNext = () => {
    setSaveStatus('saving')

    // Create JSON object with all form data
    const dataObject = {
      farmId,
      timestamp: new Date().toISOString(),
      ...formData,
      photoCount,
      voiceCount,
    }

    // In production: Write to Pending_Sync_Queue in local database
    console.log('Saving to Pending_Sync_Queue:', dataObject)

    setTimeout(() => {
      setSaveStatus('saved')
      // Reset form for next entry
      setFormData({
        cropHealth: 'good',
        pestPresence: 'none',
        waterLevel: 'adequate',
        soilColor: 'brown',
        notes: '',
        photos: [],
        voiceNotes: [],
      })
      setPhotoCount(0)
      setVoiceCount(0)

      setTimeout(() => setSaveStatus('idle'), 2000)
    }, 500)
  }

  const handleSaveAndSync = () => {
    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }, 1000)
  }

  const handleRequestConsent = () => {
    setShowConsentModal(true)
  }

  const handleGrantConsent = () => {
    // In production: Record consent transaction on blockchain
    const hash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`
    setConsentHash(hash)
    setHasConsent(true)
    setShowConsentModal(false)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Offline banner */}
      <SyncStatusBanner status={isOffline ? 'offline' : 'synced'} pendingItems={1} />

      {/* Header */}
      <header className="border-b border-border bg-background/80 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-4">
          <Link href={`/officer/farm/${farmId}`}>
            <button
              className="p-2 rounded-lg hover:bg-card transition-colors flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground truncate">Field Data Collection</h1>
            <p className="text-xs text-muted-foreground">Offline mode - syncs automatically</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Save status notification */}
        {saveStatus === 'saved' && (
          <div className="rounded-lg bg-primary/10 border border-primary p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">Entry saved locally</p>
              <p className="text-xs text-muted-foreground">Added to sync queue</p>
            </div>
          </div>
        )}

        {/* Media capture section */}
        <div className="space-y-4">
          <h3 className="font-bold font-poppins text-foreground text-base">Capture Field Data</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={handleTakePhoto}
              className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2"
            >
              <Camera className="w-6 h-6 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-center">Take Photo</span>
              {photoCount > 0 && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {photoCount} captured
                </span>
              )}
            </button>

            <button
              onClick={handleRecordVoice}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                isRecording
                  ? 'border-destructive bg-destructive/5 animate-pulse'
                  : 'border-dashed border-border hover:border-primary hover:bg-primary/5'
              }`}
            >
              <Mic className={`w-6 h-6 ${isRecording ? 'text-destructive' : 'text-primary'}`} />
              <span className="text-xs sm:text-sm font-semibold text-center">
                {isRecording ? `Recording ${recordingTime}s` : 'Record Note'}
              </span>
              {voiceCount > 0 && !isRecording && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {voiceCount} recorded
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Farmer Consent Section - Blockchain data sovereignty */}
        <div className={`rounded-lg p-4 border ${hasConsent ? 'bg-primary/10 border-primary/30' : 'bg-card border-border'}`}>
          <div className="flex items-start gap-3">
            <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${hasConsent ? 'text-primary' : 'text-muted-foreground'}`} />
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">Farmer Data Consent</p>
              {hasConsent ? (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-primary font-medium">Consent granted and recorded on blockchain</p>
                  <p className="text-xs text-muted-foreground font-mono">{consentHash}</p>
                </div>
              ) : (
                <div className="mt-2 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Request the farmer&apos;s permission to collect and share their data. Consent is recorded on blockchain for transparency.
                  </p>
                  <button
                    onClick={handleRequestConsent}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors"
                  >
                    Request Consent
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Offline notice */}
        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-3 flex gap-2 text-xs">
          <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-foreground">
            <span className="font-semibold text-yellow-500">Offline Mode:</span> All photos and voice notes are saved locally. Data will sync when connected.
          </p>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <h3 className="font-bold font-poppins text-foreground text-base">Field Observations</h3>

          <div className="space-y-3">
            {/* Crop Health */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Crop Health Status</label>
              <select
                value={formData.cropHealth}
                onChange={(e) => setFormData({ ...formData, cropHealth: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {dropdownOptions.cropHealth.map((opt) => (
                  <option key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Pest Presence */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Pest Presence</label>
              <select
                value={formData.pestPresence}
                onChange={(e) => setFormData({ ...formData, pestPresence: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {dropdownOptions.pestPresence.map((opt) => (
                  <option key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Water Level */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Water Level</label>
              <select
                value={formData.waterLevel}
                onChange={(e) => setFormData({ ...formData, waterLevel: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {dropdownOptions.waterLevel.map((opt) => (
                  <option key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Color */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Soil Color</label>
              <select
                value={formData.soilColor}
                onChange={(e) => setFormData({ ...formData, soilColor: e.target.value })}
                className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {dropdownOptions.soilColor.map((opt) => (
                  <option key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any other observations, issues, or recommendations..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
              <p className="text-xs text-muted-foreground">{formData.notes.length}/500 characters</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleSaveAndSync}
            disabled={saveStatus === 'saving'}
            className={`flex-1 h-12 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
              saveStatus === 'saving'
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save & Sync'}
          </button>
          <button
            onClick={handleSaveAndNext}
            disabled={saveStatus === 'saving'}
            className="flex-1 h-12 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save & Next'}
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Offline data will be stored in your device and synced when connection is available
        </p>
      </div>

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-background border border-border rounded-t-xl sm:rounded-xl w-full sm:max-w-md p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-poppins text-foreground">Request Consent</h3>
                  <p className="text-xs text-muted-foreground">Blockchain-verified permission</p>
                </div>
              </div>
              <button
                onClick={() => setShowConsentModal(false)}
                className="p-2 rounded-lg hover:bg-card transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-foreground">
                Please read the following to the farmer in their language:
              </p>
              <div className="p-4 bg-card border border-border rounded-lg space-y-2">
                <p className="text-foreground font-medium">&quot;I am requesting your permission to:&quot;</p>
                <ul className="text-muted-foreground space-y-1 text-xs list-disc list-inside">
                  <li>Collect information about your farm and crops</li>
                  <li>Take photos of your field conditions</li>
                  <li>Share this data with the agricultural department</li>
                  <li>Use this data to provide you with better advice</li>
                </ul>
                <p className="text-foreground font-medium pt-2">&quot;Your data will be:&quot;</p>
                <ul className="text-muted-foreground space-y-1 text-xs list-disc list-inside">
                  <li>Encrypted and stored securely</li>
                  <li>Only accessed with your permission</li>
                  <li>Logged on blockchain for transparency</li>
                  <li>You can revoke access anytime</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground text-center">
                Farmer must verbally confirm &quot;Yes, I agree&quot; before proceeding
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleGrantConsent}
                  className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors"
                >
                  Farmer Agreed
                </button>
                <button
                  onClick={() => setShowConsentModal(false)}
                  className="flex-1 h-12 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors"
                >
                  Farmer Declined
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
