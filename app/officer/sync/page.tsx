'use client'

import Link from 'next/link'
import { ArrowLeft, Wifi, WifiOff, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

/**
 * Screen B5: The Sync Manager
 * - Network listener detects connectivity changes
 * - Queue processing: iterates through Pending_Sync_Queue
 * - Conflict resolution modal for data conflicts
 * - Blockchain audit trail with explorer link
 * - Responsive layout for mobile/tablet
 */
export default function SyncManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [showConflictModal, setShowConflictModal] = useState(false)
  const [selectedConflict, setSelectedConflict] = useState<(typeof pendingItems)[0] | null>(null)

  // Mock pending items in sync queue
  const [pendingItems, setPendingItems] = useState([
    {
      id: 'sync-1',
      type: 'Data Collection',
      farm: "Ramesh's Field",
      timestamp: '2 hours ago',
      status: 'pending',
      retries: 0,
      blockchainHash: null,
    },
    {
      id: 'sync-2',
      type: 'Data Collection',
      farm: 'Irrigation Plot A',
      timestamp: '4 hours ago',
      status: 'pending',
      retries: 1,
      blockchainHash: null,
    },
    {
      id: 'sync-3',
      type: 'Sensor Reading',
      farm: 'North Ridge Farm',
      timestamp: '1 day ago',
      status: 'conflict',
      retries: 2,
      blockchainHash: null,
      conflictDetails: {
        localValue: 'Millet recommended',
        serverValue: 'Wheat recommended',
      },
    },
    {
      id: 'sync-4',
      type: 'Data Collection',
      farm: 'South Field',
      timestamp: '2 days ago',
      status: 'synced',
      retries: 0,
      blockchainHash: '0xabc123...def456',
    },
  ])

  // Network listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Auto-sync when online
  useEffect(() => {
    if (isOnline && pendingItems.some((item) => item.status === 'pending')) {
      // Auto-start sync after a delay
      const timeout = setTimeout(() => {
        handleStartSync()
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isOnline])

  const handleStartSync = () => {
    setIsSyncing(true)
    setSyncProgress(0)

    // Simulate sync process
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSyncing(false)
          // Mark items as synced and add blockchain hash
          setPendingItems((items) =>
            items.map((item) =>
              item.status === 'pending'
                ? {
                    ...item,
                    status: 'synced',
                    blockchainHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
                  }
                : item,
            ),
          )
          return 100
        }
        return prev + 20
      })
    }, 500)
  }

  const handleResolveConflict = (resolution: 'keep-local' | 'keep-server') => {
    if (!selectedConflict) return

    setPendingItems((items) =>
      items.map((item) =>
        item.id === selectedConflict.id
          ? {
              ...item,
              status: 'synced',
              blockchainHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
            }
          : item,
      ),
    )

    setShowConflictModal(false)
    setSelectedConflict(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 animate-spin" />
      case 'conflict':
        return <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
      default:
        return <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
        return 'text-primary'
      case 'pending':
        return 'text-yellow-500'
      case 'conflict':
        return 'text-destructive'
      default:
        return 'text-muted-foreground'
    }
  }

  const pendingCount = pendingItems.filter((item) => item.status === 'pending').length
  const conflictCount = pendingItems.filter((item) => item.status === 'conflict').length
  const syncedCount = pendingItems.filter((item) => item.status === 'synced').length

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
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-foreground">Sync Manager</h1>
            <div className="flex items-center gap-2 mt-1">
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-primary" />
                  <p className="text-xs text-primary font-semibold">Connected</p>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-destructive" />
                  <p className="text-xs text-destructive font-semibold">Offline</p>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-2">Pending Sync</p>
            <p className="text-2xl sm:text-3xl font-bold font-poppins text-yellow-500">{pendingCount}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-2">Conflicts</p>
            <p className="text-2xl sm:text-3xl font-bold font-poppins text-destructive">{conflictCount}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-2">Synced</p>
            <p className="text-2xl sm:text-3xl font-bold font-poppins text-primary">{syncedCount}</p>
          </div>
        </div>

        {/* Sync progress */}
        {isSyncing && (
          <div className="rounded-lg bg-primary/10 border border-primary p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">Syncing...</p>
              <p className="text-sm text-muted-foreground">{syncProgress}%</p>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${syncProgress}%` }} />
            </div>
          </div>
        )}

        {/* Start sync button */}
        {!isSyncing && isOnline && pendingCount > 0 && (
          <div className="flex gap-3">
            <button
              onClick={handleStartSync}
              className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-sm sm:text-base"
            >
              Sync Now ({pendingCount} items)
            </button>
          </div>
        )}

        {/* Offline notice */}
        {!isOnline && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 flex gap-3">
            <WifiOff className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">You&apos;re offline</p>
              <p className="text-xs text-muted-foreground mt-1">
                Pending items will sync automatically when you&apos;re back online.
              </p>
            </div>
          </div>
        )}

        {/* Sync Queue */}
        <div className="space-y-4">
          <h3 className="text-base font-bold font-poppins text-foreground">Sync Queue</h3>
          <div className="space-y-2">
            {pendingItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">No items in sync queue</p>
              </div>
            ) : (
              pendingItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    item.status === 'conflict'
                      ? 'bg-destructive/10 border-destructive/30'
                      : item.status === 'synced'
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {getStatusIcon(item.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-foreground text-sm">{item.type}</p>
                          <span className={`text-xs font-semibold ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.farm}</p>
                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    {item.status === 'conflict' && (
                      <button
                        onClick={() => {
                          setSelectedConflict(item)
                          setShowConflictModal(true)
                        }}
                        className="flex-shrink-0 px-3 py-1 text-xs font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded transition-colors whitespace-nowrap"
                      >
                        Resolve
                      </button>
                    )}
                    {item.status === 'synced' && item.blockchainHash && (
                      <a
                        href={`https://etherscan.io/tx/${item.blockchainHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1 px-3 py-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        <span>Audit Trail</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Conflict Resolution Modal */}
      {showConflictModal && selectedConflict && selectedConflict.conflictDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-background border border-border rounded-t-lg sm:rounded-lg w-full sm:w-full sm:max-w-md p-4 sm:p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold font-poppins text-foreground">Resolve Conflict</h3>
              <p className="text-sm text-muted-foreground mt-1">{selectedConflict.farm}</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Local Data (Your Entry)</p>
                <div className="p-3 bg-card border border-border rounded text-sm text-foreground">
                  {selectedConflict.conflictDetails.localValue}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Server Data (Updated by Someone)</p>
                <div className="p-3 bg-card border border-border rounded text-sm text-foreground">
                  {selectedConflict.conflictDetails.serverValue}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleResolveConflict('keep-local')}
                className="flex-1 h-11 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-sm"
              >
                Keep Mine
              </button>
              <button
                onClick={() => handleResolveConflict('keep-server')}
                className="flex-1 h-11 rounded-lg border-2 border-border text-foreground hover:bg-card/50 font-semibold transition-colors text-sm"
              >
                Keep Theirs
              </button>
            </div>

            <button
              onClick={() => setShowConflictModal(false)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
