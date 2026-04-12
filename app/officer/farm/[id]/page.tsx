'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { DigitalTwin3D } from '@/components/digital-twin-3d'
import { ArrowLeft, Droplets, Thermometer, Wind, Cloud, AlertCircle, Clock } from 'lucide-react'

/**
 * Screen B2: Farm Digital Twin
 * - Displays 3D terrain visualization (Brown=Dry, Blue=Wet)
 * - HUD with real-time sensor data
 * - Stale data warning if > 24 hours old
 * - Responsive cards for metrics
 */
export default function FarmDetail() {
  const params = useParams()
  const farmId = params.id as string

  // Mock farm data
  const farm = {
    id: farmId,
    name: "Ramesh's Field",
    area: '2.5 hectares',
    crops: ['Wheat', 'Rice'],
    soilType: 'Alluvial',
    lastUpdated: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    currentConditions: {
      soilMoisture: 65,
      temperature: 28,
      humidity: 72,
      windSpeed: 12,
    },
    sensors: [
      { id: 'soil-1', name: 'North Plot', moisture: 58, lastRead: '25 min ago', isStale: false },
      { id: 'soil-2', name: 'Central Plot', moisture: 65, lastRead: '18 min ago', isStale: false },
      { id: 'soil-3', name: 'South Plot', moisture: 72, lastRead: '2 days ago', isStale: true },
    ],
  }

  const isStaleData = (date: Date) => {
    const hoursDiff = (Date.now() - date.getTime()) / (1000 * 60 * 60)
    return hoursDiff > 24
  }

  const getMoistureColor = (moisture: number) => {
    if (moisture < 40) return 'text-destructive'
    if (moisture < 60) return 'text-yellow-500'
    return 'text-primary'
  }

  const getMoistureBg = (moisture: number) => {
    if (moisture < 40) return 'bg-destructive/10 border-destructive/30'
    if (moisture < 60) return 'bg-yellow-500/10 border-yellow-500/30'
    return 'bg-primary/10 border-primary/30'
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-4">
          <Link href="/officer">
            <button
              className="p-2 rounded-lg hover:bg-card transition-colors flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground truncate">{farm.name}</h1>
            <p className="text-xs text-muted-foreground">
              {farm.area} • {farm.crops.join(', ')}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Key metrics - responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">Soil Moisture</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{farm.currentConditions.soilMoisture}%</p>
            <p className="text-xs text-muted-foreground mt-1">{farm.lastUpdated.toLocaleTimeString()}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{farm.currentConditions.temperature}°C</p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{farm.currentConditions.humidity}%</p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">Wind Speed</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{farm.currentConditions.windSpeed} km/h</p>
          </div>
        </div>

        {/* Farm Info */}
        <div className="p-4 rounded-lg bg-card border border-border space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Soil Type</p>
              <p className="font-semibold text-foreground">{farm.soilType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-foreground">30 min ago</p>
                {isStaleData(farm.lastUpdated) && (
                  <AlertCircle className="w-4 h-4 text-destructive" title="Data is stale (>24h)" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Digital Twin */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold font-poppins text-foreground mb-2">Digital Twin - 3D Terrain</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              3D visualization of soil moisture levels (Brown = Dry, Blue = Moist). Drag to rotate, scroll to zoom.
            </p>
          </div>
          <div className="rounded-lg border border-border overflow-hidden bg-card h-80 sm:h-96">
            <DigitalTwin3D />
          </div>
        </div>

        {/* Sensor Data - HUD Display */}
        <div className="space-y-4">
          <h3 className="text-base font-bold font-poppins text-foreground">Sensor Network - Real-Time Data</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {farm.sensors.map((sensor) => (
              <div key={sensor.id} className={`p-4 rounded-lg border ${getMoistureBg(sensor.moisture)}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{sensor.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{sensor.lastRead}</p>
                    </div>
                  </div>
                  {sensor.isStale && (
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" title="Stale data (>24h)" />
                  )}
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Soil Moisture</p>
                    <p className={`text-2xl font-bold ${getMoistureColor(sensor.moisture)}`}>
                      {sensor.moisture}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/officer/farm/${farmId}/simulation`} className="flex-1">
            <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-sm sm:text-base">
              Run Simulation
            </button>
          </Link>
          <Link href={`/officer/farm/${farmId}/data-collection`} className="flex-1">
            <button className="w-full h-12 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors text-sm sm:text-base">
              Collect Data
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
