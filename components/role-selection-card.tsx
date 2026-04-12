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
    <Link href={href} className="block">
      <button className="w-full flex flex-col items-center justify-center gap-4 sm:gap-5 lg:gap-6 p-5 sm:p-6 lg:p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-primary/10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary">{icon}</div>
        </div>
        <div className="text-center space-y-1 sm:space-y-1.5 lg:space-y-2">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-poppins text-foreground">{title}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-[200px] sm:max-w-xs mx-auto">{description}</p>
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
    <div className="flex justify-center w-full px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-xl sm:max-w-2xl lg:max-w-3xl">
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
    </div>
  )
}
