'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
  audioUrl?: string
  autoPlay?: boolean
  onPlaybackComplete?: () => void
}

/**
 * CustomAudioPlayer - Audio player with playback controls and waveform visualization
 * Used to display advisory audio to farmers
 */
export function AudioPlayer({ audioUrl, autoPlay = false, onPlaybackComplete }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Auto-play if requested
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Auto-play blocked by browser
        console.log('Auto-play blocked by browser')
      })
      setIsPlaying(true)
    }
  }, [audioUrl, autoPlay])

  // Draw waveform visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(11, 26, 11, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw progress bar
      const progress = duration ? (currentTime / duration) * canvas.width : 0
      ctx.fillStyle = '#64ffb4'
      ctx.fillRect(0, 0, progress, canvas.height)

      // Draw time labels
      ctx.fillStyle = '#a0a0a0'
      ctx.font = '12px Inter'
      ctx.textAlign = 'left'
      ctx.fillText(formatTime(currentTime), 4, canvas.height - 4)

      ctx.textAlign = 'right'
      ctx.fillText(formatTime(duration), canvas.width - 4, canvas.height - 4)

      if (isPlaying) requestAnimationFrame(draw)
    }

    draw()
  }, [isPlaying, currentTime, duration])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => console.log('Playback failed'))
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    onPlaybackComplete?.()
  }

  return (
    <div className="w-full space-y-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Waveform visualization */}
      <canvas
        ref={canvasRef}
        width={300}
        height={40}
        className="w-full bg-card rounded-lg border border-border"
      />

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePlayPause}
          className="flex-shrink-0 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground fill-current" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          )}
        </button>

        <div className="flex-1 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground font-mono whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  )
}
