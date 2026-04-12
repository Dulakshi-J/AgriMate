'use client'

import Link from 'next/link'
import { Users, Clipboard } from 'lucide-react'

interface RoleSelectionCardProps {
  role: 'farmer' | 'officer'
  title: string
  description: string
  icon: React.ReactNode
}

function RoleCard({ role, title, description, icon }: RoleSelectionCardProps) {
  const href = role === 'farmer' ? '/farmer' : '/officer'

  return (
    <Link href={href}>
      <button className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer min-h-[220px] sm:min-h-[280px]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-primary/10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 text-primary">{icon}</div>
        </div>
        <div className="text-center space-y-1.5 sm:space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold font-poppins text-foreground">{title}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">{description}</p>
        </div>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider">
          Select Role
        </div>
      </button>
    </Link>
  )
}

export function RoleSelection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl px-2 sm:px-0">
      <RoleCard
        role="farmer"
        title="Farmer"
        description="Access AI-powered agricultural advice through voice. Get real-time alerts and smart recommendations."
        icon={<Users className="w-full h-full" strokeWidth={1.5} />}
      />
      <RoleCard
        role="officer"
        title="Extension Officer"
        description="Monitor multiple farms, access digital twins, and make data-driven decisions with advanced analytics."
        icon={<Clipboard className="w-full h-full" strokeWidth={1.5} />}
      />
    </div>
  )
}
