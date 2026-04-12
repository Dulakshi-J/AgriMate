'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'

interface AlertCardProps {
  title: string
  description: string
  severity?: 'warning' | 'error' | 'info'
  dismissible?: boolean
  onDismiss?: () => void
}

/**
 * AlertCard - Reusable alert banner component
 */
export function AlertCard({
  title,
  description,
  severity = 'warning',
  dismissible = true,
  onDismiss,
}: AlertCardProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  const bgColor = severity === 'error' ? 'bg-destructive/10' : severity === 'info' ? 'bg-primary/10' : 'bg-yellow-500/10'
  const borderColor = severity === 'error' ? 'border-destructive/20' : severity === 'info' ? 'border-primary/20' : 'border-yellow-500/20'
  const iconColor = severity === 'error' ? 'text-destructive' : severity === 'info' ? 'text-primary' : 'text-yellow-500'

  return (
    <div className={`p-4 rounded-lg border ${bgColor} ${borderColor} flex items-start gap-4`}>
      <AlertTriangle className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {dismissible && (
        <button onClick={handleDismiss} className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}
