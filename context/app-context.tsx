'use client'

import { createContext, useContext, ReactNode, useState } from 'react'

export type UserRole = 'farmer' | 'officer' | null

interface PendingItem {
  id: string
  type: 'data' | 'photo' | 'audio' | 'advisory'
  farmId: string
  timestamp: number
  status: 'pending' | 'syncing' | 'error'
}

interface AppContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  isOffline: boolean
  setIsOffline: (offline: boolean) => void
  pendingItems: PendingItem[]
  addPendingItem: (item: PendingItem) => void
  removePendingItem: (id: string) => void
  syncStatus: 'idle' | 'syncing' | 'error' | 'synced'
  setSyncStatus: (status: 'idle' | 'syncing' | 'error' | 'synced') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

/**
 * AppProvider - Global state management for AgriMate
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isOffline, setIsOffline] = useState(false)
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([])
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error' | 'synced'>('idle')

  const addPendingItem = (item: PendingItem) => {
    setPendingItems((prev) => [...prev, item])
  }

  const removePendingItem = (id: string) => {
    setPendingItems((prev) => prev.filter((item) => item.id !== id))
  }

  const value: AppContextType = {
    userRole,
    setUserRole,
    isOffline,
    setIsOffline,
    pendingItems,
    addPendingItem,
    removePendingItem,
    syncStatus,
    setSyncStatus,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/**
 * useApp - Hook to access app context
 */
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
