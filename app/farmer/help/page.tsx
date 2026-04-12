'use client'

import Link from 'next/link'
import { ArrowLeft, Play, Pause, Droplets, Bug, Leaf, Sun, Wind, Sprout, Volume2, Phone, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'

/**
 * Help Page - Best Practice Library
 * - Audio-based tutorials for low-literacy users (key PDF requirement)
 * - IVR-style menu navigation
 * - Categories: Water Conservation, Pest Management, Soil Health, etc.
 * - All content available offline
 */
export default function FarmerHelp() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const categories = [
    {
      id: 'water',
      name: 'Water Conservation',
      icon: Droplets,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
    },
    {
      id: 'pest',
      name: 'Pest Control',
      icon: Bug,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10 border-red-500/30',
    },
    {
      id: 'soil',
      name: 'Soil Health',
      icon: Leaf,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'climate',
      name: 'Climate Resilience',
      icon: Sun,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 border-orange-500/30',
    },
    {
      id: 'crop',
      name: 'Crop Selection',
      icon: Sprout,
      color: 'text-primary',
      bgColor: 'bg-primary/10 border-primary/30',
    },
  ]

  const tutorials: Record<string, Array<{
    id: string
    title: string
    duration: string
    description: string
    audioText: string
  }>> = {
    water: [
      {
        id: 'water-1',
        title: 'Drip Irrigation Setup',
        duration: '3 min',
        description: 'Learn how to set up drip irrigation to save water',
        audioText: 'Drip irrigation is one of the most efficient ways to water your crops. Start by laying the main pipe along your field edge. Connect smaller tubes with drippers near each plant. Water slowly drips directly to the roots, reducing water loss by up to 50 percent compared to flood irrigation. Check drippers weekly for clogs.'
      },
      {
        id: 'water-2',
        title: 'Rainwater Harvesting',
        duration: '4 min',
        description: 'Collect and store rainwater for dry seasons',
        audioText: 'Rainwater harvesting helps you save water for dry periods. Create a collection area on your roof or a sloped surface. Direct the water through pipes into a storage tank or pond. Cover the storage to prevent evaporation. One millimeter of rain on 100 square meters gives you 100 liters of water. Use this water during dry spells for your crops.'
      },
      {
        id: 'water-3',
        title: 'Mulching Techniques',
        duration: '2 min',
        description: 'Reduce water evaporation with mulching',
        audioText: 'Mulching is covering the soil around your plants with organic material. Use rice straw, dried leaves, or grass clippings. Apply a layer 5 to 10 centimeters thick. This keeps the soil moist, reduces water evaporation by up to 70 percent, and also controls weeds. Replace mulch as it breaks down.'
      },
    ],
    pest: [
      {
        id: 'pest-1',
        title: 'Natural Pest Repellents',
        duration: '3 min',
        description: 'Make organic pest control at home',
        audioText: 'You can make natural pest repellents at home. Mix neem leaves with water and let it sit for 2 days. Strain and spray on plants early morning. Garlic and chili mixed with water also works well against many insects. These methods are safe for you, your family, and the environment. Apply every 7 to 10 days.'
      },
      {
        id: 'pest-2',
        title: 'Identifying Common Pests',
        duration: '4 min',
        description: 'Recognize pest damage early',
        audioText: 'Early pest detection saves your crops. Look for holes in leaves, this indicates caterpillars or beetles. Yellow spots mean aphids or mites. Wilting plants may have root pests. Check your crops every morning, especially under leaves. Take photos and ask your extension officer if unsure. Early treatment is much easier than fighting large infestations.'
      },
    ],
    soil: [
      {
        id: 'soil-1',
        title: 'Making Organic Compost',
        duration: '5 min',
        description: 'Turn waste into valuable fertilizer',
        audioText: 'Composting turns kitchen and farm waste into rich fertilizer. Create a pile with layers: green waste like vegetable scraps, then brown waste like dry leaves. Add a thin layer of soil between. Keep it moist but not wet. Turn the pile every 2 weeks. In 2 to 3 months, you will have dark, crumbly compost. Mix into your soil before planting to improve fertility naturally.'
      },
      {
        id: 'soil-2',
        title: 'Crop Rotation Benefits',
        duration: '3 min',
        description: 'Improve soil by rotating crops',
        audioText: 'Growing the same crop repeatedly depletes soil nutrients. Rotate your crops each season. After rice, plant legumes like beans or lentils. Legumes add nitrogen to the soil. Then plant vegetables. This cycle keeps soil healthy, reduces pests, and improves yields. Plan your rotation for the full year ahead.'
      },
    ],
    climate: [
      {
        id: 'climate-1',
        title: 'Drought Preparation',
        duration: '4 min',
        description: 'Protect crops during dry periods',
        audioText: 'Prepare for drought before it arrives. Choose drought-resistant crop varieties when possible. Mulch heavily to retain moisture. Water deeply but less frequently to encourage deep root growth. Create shade using cloth or natural materials during extreme heat. Store extra water when available. Monitor weather forecasts and plan irrigation accordingly.'
      },
      {
        id: 'climate-2',
        title: 'Flood Protection',
        duration: '3 min',
        description: 'Prepare fields for heavy rainfall',
        audioText: 'Heavy rains can damage crops quickly. Before monsoon, clear all drainage channels of debris. Create raised beds for vegetables to prevent waterlogging. Build small bunds around fields to control water flow. After flooding, check for pest increase and apply preventive measures. Allow soil to dry before working on it to prevent compaction.'
      },
    ],
    crop: [
      {
        id: 'crop-1',
        title: 'Choosing the Right Crop',
        duration: '4 min',
        description: 'Select crops based on soil and climate',
        audioText: 'Choosing the right crop depends on your soil, water availability, and weather. Test your soil first. Sandy soil suits root vegetables and groundnuts. Clay soil works for rice and sugarcane. Check expected rainfall for the season. Low rainfall areas should choose millet or sorghum over rice. Consider market prices and local demand. Your extension officer can help with current recommendations.'
      },
      {
        id: 'crop-2',
        title: 'Seed Selection and Storage',
        duration: '3 min',
        description: 'Get the best seeds for planting',
        audioText: 'Good seeds give good harvests. Buy certified seeds from trusted sources. Check the packaging date, seeds should be recent. Store seeds in a cool, dry place away from sunlight. Use airtight containers to prevent moisture and pests. Test germination before planting by placing 10 seeds on wet cloth. At least 8 should sprout within 7 days for good quality seeds.'
      },
    ],
  }

  const handlePlay = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any currently playing audio
      window.speechSynthesis.cancel()

      if (playingId === id) {
        // If clicking the same item, stop it
        setPlayingId(null)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.onend = () => setPlayingId(null)
      utterance.onerror = () => setPlayingId(null)
      window.speechSynthesis.speak(utterance)
      setPlayingId(id)
    }
  }

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
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground">Farming Guide</h1>
            <p className="text-xs text-muted-foreground">Audio tutorials - works offline</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* IVR-style intro */}
        <div className="rounded-lg bg-primary/10 border border-primary/30 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Voice-First Help Center</p>
              <p className="text-xs text-muted-foreground">Tap any guide to listen. No reading required.</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-poppins text-foreground">Browse by Topic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                    isActive
                      ? 'border-primary bg-primary/10'
                      : `border-border bg-card hover:border-primary/50`
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <p className="font-semibold text-foreground text-xs sm:text-sm">{cat.name}</p>
                </button>
              )
            })}
          </div>
        </section>

        {/* Tutorials for selected category */}
        {activeCategory && tutorials[activeCategory] && (
          <section className="space-y-4">
            <h2 className="text-base font-bold font-poppins text-foreground">
              {categories.find(c => c.id === activeCategory)?.name} Guides
            </h2>
            <div className="space-y-3">
              {tutorials[activeCategory].map((tutorial) => (
                <div
                  key={tutorial.id}
                  className={`p-4 rounded-lg border transition-all ${
                    playingId === tutorial.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handlePlay(tutorial.id, tutorial.audioText)}
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        playingId === tutorial.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/20 text-primary hover:bg-primary/30'
                      }`}
                      aria-label={playingId === tutorial.id ? 'Pause' : 'Play'}
                    >
                      {playingId === tutorial.id ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground text-sm">{tutorial.title}</p>
                        <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">
                          {tutorial.duration}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{tutorial.description}</p>
                      {playingId === tutorial.id && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex gap-1">
                            <span className="w-1 h-4 bg-primary rounded animate-pulse" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 h-3 bg-primary rounded animate-pulse" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 h-5 bg-primary rounded animate-pulse" style={{ animationDelay: '300ms' }} />
                            <span className="w-1 h-2 bg-primary rounded animate-pulse" style={{ animationDelay: '450ms' }} />
                          </div>
                          <span className="text-xs text-primary font-medium">Playing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Help */}
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-base font-bold font-poppins text-foreground">Need More Help?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-card border border-border space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <p className="font-semibold text-foreground text-sm">Call Helpline</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Dial *123# or call 1800-XXX-XXXX (toll-free) to speak with an advisor
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-border space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <p className="font-semibold text-foreground text-sm">Contact Officer</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Your local extension officer can visit and provide personalized advice
              </p>
            </div>
          </div>
        </section>

        {/* Offline notice */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            All guides are available offline. Listen anytime, anywhere.
          </p>
        </div>
      </div>
    </main>
  )
}
