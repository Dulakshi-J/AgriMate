'use client'

import { useState, useRef } from 'react'
import { Mic, Square } from 'lucide-react'

interface MicrophoneButtonProps {
  onStartListening: () => void
  onStopListening: () => void
  isListening: boolean
}

/**
 * MicrophoneButton - Large touch-friendly microphone button with pulsing animation
 * Used as the primary interaction point for farmers in voice-first interface
 */
export function MicrophoneButton({ onStartListening, onStopListening, isListening }: MicrophoneButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (isListening) {
      onStopListening()
    } else {
      onStartListening()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full transition-all duration-300 ${
          isListening
            ? 'bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/50'
            : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/50'
        }`}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
      >
        {/* Pulsing outer ring (only when listening) */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-4 border-destructive animate-pulse opacity-75" />
        )}

        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {isListening ? (
            <Square className="w-10 h-10 sm:w-12 sm:h-12 text-destructive-foreground fill-current" strokeWidth={1.5} />
          ) : (
            <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" strokeWidth={1.5} />
          )}
        </div>

        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
            isListening ? 'bg-destructive' : 'bg-primary'
          }`}
        />
      </button>

      {/* Status text */}
      <p className="text-center text-sm font-medium text-muted-foreground">
        {isListening ? 'I am listening...' : 'Tap to speak'}
      </p>
    </div>
  )
}
