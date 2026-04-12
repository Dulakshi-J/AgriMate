'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Volume2, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'

/**
 * Screen B3: What-If Simulation
 * - Rainfall slider for hypothesis input
 * - Real-time yield prediction calculation
 * - Probability bars for crop success rates
 * - Generate voice advisory via TTS
 * - Responsive layout for tablet use
 */
export default function FarmSimulation() {
  const params = useParams()
  const farmId = params.id as string

  const [rainfall, setRainfall] = useState(50)
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false)
  const [voiceGenerated, setVoiceGenerated] = useState(false)

  // Cleanup: Cancel speech synthesis when navigating away
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Farm data for simulation
  const farmData = {
    soilType: 'Alluvial',
    currentCrop: 'Wheat',
    crops: ['Wheat', 'Rice', 'Millet', 'Maize'],
  }

  // Prediction logic: rainfall + soil type + crop type = yield probability
  const calculateYieldProbability = (cropName: string, rainfallMm: number) => {
    const baseScores: Record<string, number> = {
      'Wheat': rainfallMm > 300 ? 20 : rainfallMm > 200 ? 70 : 50,
      'Rice': rainfallMm > 500 ? 90 : rainfallMm > 400 ? 75 : 30,
      'Millet': rainfallMm > 200 ? 80 : 60,
      'Maize': rainfallMm > 400 ? 85 : rainfallMm > 300 ? 70 : 40,
    }
    return baseScores[cropName] || 50
  }

  const generateVoiceAdvisory = async () => {
    setIsGeneratingVoice(true)

    const topCrop = farmData.crops.reduce((best, crop) => {
      const bestScore = calculateYieldProbability(best, rainfall)
      const cropScore = calculateYieldProbability(crop, rainfall)
      return cropScore > bestScore ? crop : best
    })

    const advisoryText = `Based on ${rainfall}mm rainfall prediction and ${farmData.soilType} soil, ${topCrop} yield drops to ${calculateYieldProbability(topCrop, rainfall)}%. 
    ${calculateYieldProbability(topCrop, rainfall) < 50 ? `${farmData.crops.find(c => calculateYieldProbability(c, rainfall) > calculateYieldProbability(topCrop, rainfall)) || farmData.crops[1]} is recommended.` : 'Current crop is suitable.'}
    Monitor soil moisture closely and adjust irrigation accordingly.`

    // Use Web Speech API for TTS
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(advisoryText)
      utterance.rate = 1
      utterance.onend = () => {
        setIsGeneratingVoice(false)
        setVoiceGenerated(true)
      }
      window.speechSynthesis.speak(utterance)
    } else {
      setIsGeneratingVoice(false)
      setVoiceGenerated(true)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-4">
          <Link href={`/officer/farm/${farmId}`}>
            <button
              className="p-2 rounded-lg hover:bg-card transition-colors flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground">Crop Simulation</h1>
            <p className="text-xs text-muted-foreground">What-if analysis for decision support</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Adjust the rainfall slider to simulate different weather scenarios. See how each crop would perform.
          </p>
        </div>

        {/* Rainfall Slider Input */}
        <div className="rounded-lg bg-card border border-border p-4 sm:p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-foreground">Hypothetical Rainfall</label>
                <span className="text-lg sm:text-2xl font-bold text-primary">{rainfall} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="800"
                step="10"
                value={rainfall}
                onChange={(e) => {
                  setRainfall(Number(e.target.value))
                  setVoiceGenerated(false)
                }}
                className="w-full h-3 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                aria-label="Rainfall slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0 mm (Drought)</span>
                <span>800 mm (Heavy Rain)</span>
              </div>
            </div>
          </div>

          {/* Farm Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-background/50 rounded">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Soil Type</p>
              <p className="font-semibold text-foreground">{farmData.soilType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Crop</p>
              <p className="font-semibold text-foreground">{farmData.currentCrop}</p>
            </div>
          </div>
        </div>

        {/* Crop Probability Visualization */}
        <div className="rounded-lg bg-card border border-border p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold font-poppins text-foreground">Predicted Yield Success Rate</h3>
          </div>

          <div className="space-y-3">
            {farmData.crops.map((crop) => {
              const probability = calculateYieldProbability(crop, rainfall)
              const isRecommended = crop === farmData.currentCrop
              return (
                <div key={crop} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${isRecommended ? 'text-primary' : 'text-foreground'}`}>
                      {crop}
                    </span>
                    <span className="text-sm font-bold text-primary">{probability}%</span>
                  </div>
                  <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        probability > 70
                          ? 'bg-primary'
                          : probability > 50
                            ? 'bg-yellow-500'
                            : 'bg-destructive'
                      }`}
                      style={{ width: `${probability}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Voice Advisory */}
        <div className="rounded-lg bg-card border border-border p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold font-poppins text-foreground">Voice Advisory</h3>
          </div>

          <p className="text-sm text-muted-foreground">
            Generate an audio advisory based on the rainfall scenario. This will be converted to speech for easy communication with farmers.
          </p>

          <button
            onClick={generateVoiceAdvisory}
            disabled={isGeneratingVoice}
            className={`w-full h-12 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
              isGeneratingVoice
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : voiceGenerated
                  ? 'bg-primary/20 text-primary border border-primary'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {isGeneratingVoice ? 'Generating Audio...' : voiceGenerated ? 'Advisory Generated ✓' : 'Generate Voice Advisory'}
          </button>

          {voiceGenerated && (
            <div className="p-3 bg-primary/10 border border-primary/30 rounded text-xs text-foreground">
              Advisory generated and ready to share with farmers.
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-sm sm:text-base">
            Save Recommendation
          </button>
          <Link href={`/officer/farm/${farmId}`} className="flex-1">
            <button className="w-full h-12 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors text-sm sm:text-base">
              Back to Farm
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
