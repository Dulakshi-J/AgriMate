'use client'

import Link from 'next/link'
import { AlertTriangle, Cloud, BookOpen, Settings } from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  href: string
  variant?: 'default' | 'alert'
}

interface QuickActionsGridProps {
  actions?: QuickAction[]
}

/**
 * QuickActionsGrid - 2x2 grid of large touch-friendly action buttons for farmers
 * Minimum 48px touch targets for accessibility
 * Updated to include Best Practices (key PDF requirement for sustainable farming education)
 */
export function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  const defaultActions: QuickAction[] = [
    {
      id: 'alerts',
      label: 'Weather Alert',
      description: 'Check warnings',
      icon: <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
      href: '/farmer/alert',
      variant: 'alert',
    },
    {
      id: 'forecast',
      label: '7-Day Forecast',
      description: 'With farm tips',
      icon: <Cloud className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
      href: '/farmer/forecast',
    },
    {
      id: 'guide',
      label: 'Farming Guide',
      description: 'Audio tutorials',
      icon: <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
      href: '/farmer/help',
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Language & privacy',
      icon: <Settings className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
      href: '/farmer/settings',
    },
  ]

  const itemsToShow = actions || defaultActions

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
      {itemsToShow.map((action) => (
        <Link key={action.id} href={action.href}>
          <button
            className={`w-full h-28 sm:h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:shadow-lg px-2 ${
              action.variant === 'alert'
                ? 'bg-destructive/10 border-destructive hover:border-destructive/80 hover:shadow-destructive/20'
                : 'bg-card border-border hover:border-primary hover:shadow-primary/20'
            }`}
          >
            <div className={action.variant === 'alert' ? 'text-destructive' : 'text-primary'}>
              {action.icon}
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground hidden sm:block">{action.description}</p>
            </div>
          </button>
        </Link>
      ))}
    </div>
  )
}
