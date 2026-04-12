'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, AlertTriangle, Clock } from 'lucide-react'

interface Farm {
  id: string
  name: string
  lat: number
  lng: number
  status: 'synced' | 'pending' | 'alert'
  lastSync: string
  crops: string[]
}

/**
 * RegionalMap - Mock map display showing farms with status indicators
 * Green = synced, Orange = pending sync, Red = alert
 */
export function RegionalMap() {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null)

  // Mock farm data
  const farms: Farm[] = [
    {
      id: '1',
      name: "Ramesh's Field",
      lat: 51.5,
      lng: 50,
      status: 'synced',
      lastSync: '2 min ago',
      crops: ['Wheat', 'Rice'],
    },
    {
      id: '2',
      name: 'Community Garden',
      lat: 55,
      lng: 55,
      status: 'pending',
      lastSync: '15 min ago',
      crops: ['Vegetables'],
    },
    {
      id: '3',
      name: 'Valley Farm',
      lat: 45,
      lng: 60,
      status: 'alert',
      lastSync: '1 hour ago',
      crops: ['Corn', 'Soybean'],
    },
  ]

  return (
    <div className="relative w-full h-full min-h-[280px] rounded-lg bg-card border border-border overflow-hidden">
      {/* Mock SVG Map Background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="100" fill="#051105" />

        {/* Grid lines */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="#16a316" strokeWidth="0.5" opacity="0.2" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#16a316" strokeWidth="0.5" opacity="0.2" />

        {/* Regional boundaries (simplified) */}
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="#16a316" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Farm Markers */}
      <div className="absolute inset-0">
        {farms.map((farm) => (
          <button
            key={farm.id}
            onClick={() => setSelectedFarm(farm)}
            className={`absolute w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
              farm.status === 'synced'
                ? 'bg-primary border-primary hover:scale-125 hover:shadow-lg hover:shadow-primary/50'
                : farm.status === 'pending'
                  ? 'bg-yellow-500 border-yellow-500 hover:scale-125 hover:shadow-lg hover:shadow-yellow-500/50'
                  : 'bg-destructive border-destructive hover:scale-125 hover:shadow-lg hover:shadow-destructive/50'
            }`}
            style={{ left: `${farm.lat}%`, top: `${farm.lng}%` }}
            aria-label={`${farm.name} - ${farm.status}`}
          >
            <MapPin className="w-4 h-4 text-foreground" />
          </button>
        ))}
      </div>

      {/* Info Card */}
      {selectedFarm ? (
        <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur border border-border rounded-lg p-4 z-20">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-foreground">{selectedFarm.name}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Sync: {selectedFarm.lastSync}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{selectedFarm.crops.join(', ')}</p>
            </div>
            <Link href={`/officer/farm/${selectedFarm.id}`}>
              <button className="px-3 py-2 rounded bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors whitespace-nowrap">
                View Farm
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
          <p>Tap a farm marker to see details</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 right-4 space-y-2 bg-background/90 backdrop-blur border border-border rounded-lg p-3 z-20">
        <div className="text-xs font-semibold text-foreground mb-2">Status</div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Synced</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-muted-foreground">Pending</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Alert</span>
        </div>
      </div>
    </div>
  )
}
