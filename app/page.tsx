'use client'

import { AnimatedBackground } from '@/components/animated-background'
import { RoleSelection } from '@/components/role-selection-card'
import { AgrimateLogo } from '@/components/agrimate-logo'

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center space-y-4 sm:space-y-5 lg:space-y-6 mb-8 sm:mb-10 lg:mb-12">
            {/* Logo */}
            <div className="flex justify-center">
              <AgrimateLogo size={80} className="sm:hidden" />
              <AgrimateLogo size={100} className="hidden sm:block lg:hidden" />
              <AgrimateLogo size={120} className="hidden lg:block" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-foreground text-balance">
              AgriMate
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-balance">
              Connecting farmers with AI-powered insights and extension officers with data-driven decision making
            </p>
          </div>

          {/* Role Selection Cards */}
          <RoleSelection />

          {/* Footer */}
          <p className="text-xs text-muted-foreground mt-8 sm:mt-10 lg:mt-12">
            High Tech, High Touch Agriculture
          </p>
        </div>
      </main>
    </>
  )
}
