'use client'

import { AnimatedBackground } from '@/components/animated-background'
import { RoleSelection } from '@/components/role-selection-card'
import { AgrimateLogo } from '@/components/agrimate-logo'

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              {/* Logo */}
              <div className="flex justify-center">
                <AgrimateLogo size={100} className="sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-foreground text-balance">
                AgriMate
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-2">
                Connecting farmers with AI-powered insights and extension officers with data-driven decision making
              </p>
            </div>

            <RoleSelection />

            <p className="text-xs text-muted-foreground">
              High Tech, High Touch Agriculture
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
