'use client'

import { WifiOff, Cloud, CheckCircle, AlertTriangle, Upload } from 'lucide-react'

interface SyncStatusBannerProps {
  status?: 'offline' | 'syncing' | 'synced' | 'error'
  pendingItems?: number
}

/**
 * SyncStatusBanner - Shows offline/sync status and pending items count
 */
export function SyncStatusBanner({ status = 'synced', pendingItems = 0 }: SyncStatusBannerProps) {
  if (status === 'offline') {
    return (
      <div className="bg-muted/50 border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <WifiOff className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Offline Mode</p>
            <p className="text-xs text-muted-foreground">
              {pendingItems} items pending sync. Changes will sync when connection returns.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'syncing') {
    return (
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Syncing</p>
            <p className="text-xs text-muted-foreground">Uploading {pendingItems} items...</p>
          </div>
          <Upload className="w-4 h-4 text-primary flex-shrink-0" />
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Sync Error</p>
            <p className="text-xs text-muted-foreground">
              Failed to sync. Retry will happen automatically.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary/5 border-b border-border px-4 py-2">
      <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs">
        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
        <p className="text-muted-foreground">All data synced</p>
      </div>
    </div>
  )
}
