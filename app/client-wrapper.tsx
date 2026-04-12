'use client'

import { ReactNode } from 'react'
import { AppProvider } from '@/context/app-context'

export function ClientWrapper({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
