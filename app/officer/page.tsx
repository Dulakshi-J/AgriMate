'use client'

import Link from 'next/link'
import { RegionalMap } from '@/components/regional-map'
import { SyncStatusBanner } from '@/components/sync-status-banner'
import { AgrimateLogo } from '@/components/agrimate-logo'
import { LogOut, Settings, MapPin, AlertCircle, Clock } from 'lucide-react'
import { useState } from 'react'

/**
 * Screen B1: Regional "Offline" Map
 * - Offline vector tiles on device (no internet required)
 * - Color-coded pins: Green (Synced), Orange (Pending), Red (Critical)
 * - Tap pin to navigate to Screen B2 (Farm Detail)
 * - Responsive dashboard with quick stats
 */
export default function OfficerHome() {
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null)

  // Mock stats
  const stats = {
    farmsToVisit: 3,
    pendingSync: 5,
    alerts: 1,
    lastSync: '2 hours ago',
  }

  // Mock farm data - in production, queried from local Farm_Data table
  const farms = [
    {
      id: 'farm-1',
      name: "Ramesh's Field",
      area: '2.5 ha',
      status: 'Synced',
      lastSync: '30 min ago',
      soilType: 'Alluvial',
    },
    {
      id: 'farm-2',
      name: 'Irrigation Plot A',
      area: '1.8 ha',
      status: 'Pending',
      lastSync: '4 hours ago',
      soilType: 'Clay Loam',
    },
    {
      id: 'farm-3',
      name: 'North Ridge Farm',
      area: '3.2 ha',
      status: 'Critical',
      lastSync: '2 days ago',
      soilType: 'Sandy Loam',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Synced':
        return 'text-primary'
      case 'Pending':
        return 'text-yellow-500'
      case 'Critical':
        return 'text-destructive'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Synced':
        return 'bg-primary/10 border-primary/30'
      case 'Pending':
        return 'bg-yellow-500/10 border-yellow-500/30'
      case 'Critical':
        return 'bg-destructive/10 border-destructive/30'
      default:
        return 'bg-card border-border'
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Sync Banner */}
      <SyncStatusBanner status="synced" pendingItems={stats.pendingSync} />

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <AgrimateLogo size={40} />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground truncate">AgriMate Officer</h1>
              <p className="text-xs text-muted-foreground">Extension Officer Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/officer/sync">
              <button className="h-10 px-3 sm:px-4 rounded-lg bg-card border border-border hover:border-primary transition-colors font-semibold text-xs sm:text-sm whitespace-nowrap">
                Sync ({stats.pendingSync})
              </button>
            </Link>
            <Link href="/">
              <button className="p-2 rounded-lg hover:bg-card transition-colors" aria-label="Logout">
                <LogOut className="w-5 h-5 text-muted-foreground" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Stats cards - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-2">Farms to Visit</p>
            <p className="text-2xl sm:text-3xl font-bold font-poppins text-primary">{stats.farmsToVisit}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-2">Pending Sync</p>
            <p className="text-2xl sm:text-3xl font-bold font-poppins text-primary">{stats.pendingSync}</p>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="text-xs text-muted-foreground mb-2">Critical Alerts</p>
            <p className="text-2xl sm:text-3xl font-bold font-poppins text-destructive">{stats.alerts}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-2">Last Sync</p>
            <p className="text-sm font-semibold text-foreground">{stats.lastSync}</p>
          </div>
        </div>

        {/* Map section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold font-poppins text-foreground mb-1">Regional Overview</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Offline map with farm status. Tap a pin to view Digital Twin.
            </p>
          </div>
          <div className="rounded-lg border border-border overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px] bg-card">
            <RegionalMap />
          </div>
        </div>

        {/* Farm List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold font-poppins text-foreground">Farm Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {farms.map((farm) => (
              <Link key={farm.id} href={`/officer/farm/${farm.id}`}>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md hover:border-primary ${getStatusBgColor(farm.status)}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{farm.name}</h4>
                      <p className="text-xs text-muted-foreground">{farm.area}</p>
                    </div>
                    <MapPin className={`w-4 h-4 flex-shrink-0 ${getStatusColor(farm.status)}`} />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`font-semibold ${getStatusColor(farm.status)}`}>{farm.status}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{farm.lastSync}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <h3 className="text-base font-bold font-poppins text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/officer/farm/farm-1">
              <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-sm sm:text-base">
                View Farm Details
              </button>
            </Link>
            <Link href="/officer/sync">
              <button className="w-full h-12 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors text-sm sm:text-base">
                Sync Queue ({stats.pendingSync})
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
