'use client'

import React from 'react'

interface SoilMoisturePoint {
  x: number
  y: number
  moisture: number // 0-1 scale
}

/**
 * DigitalTwin3D - SVG-based 2D terrain visualization with soil moisture heat map
 * Shows field with moisture levels color-coded from brown (dry) to blue (wet)
 */
export function DigitalTwin3D() {
  // Generate mock soil moisture data points across the field
  const generateTerrainData = (): SoilMoisturePoint[] => {
    const points: SoilMoisturePoint[] = []
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        // Create moisture variation using sine/cosine waves
        const moisture =
          (Math.sin(x * 0.5) + Math.cos(y * 0.5) + Math.sin((x + y) * 0.3)) / 3 +
          0.5
        points.push({
          x,
          y,
          moisture: Math.max(0, Math.min(1, moisture)),
        })
      }
    }
    return points
  }

  const getMoistureColor = (moisture: number): string => {
    // Brown (dry) to Blue (wet) gradient
    const dry = { r: 139, g: 69, b: 19 } // #8B4513
    const wet = { r: 30, g: 144, b: 255 } // #1E90FF

    const t = moisture
    const r = Math.round(dry.r + (wet.r - dry.r) * t)
    const g = Math.round(dry.g + (wet.g - dry.g) * t)
    const b = Math.round(dry.b + (wet.b - dry.b) * t)

    return `rgb(${r}, ${g}, ${b})`
  }

  const terrainData = generateTerrainData()
  const cellSize = 40

  return (
    <div className="w-full h-full min-h-[280px] rounded-lg border border-border overflow-hidden bg-card flex flex-col">
      {/* SVG Visualization */}
      <div className="flex-1 flex items-center justify-center bg-background p-2 sm:p-4">
        <svg
          viewBox="0 0 400 400"
          className="border border-border rounded w-full h-full max-w-[300px] max-h-[300px] sm:max-w-[400px] sm:max-h-[400px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid background */}
          {terrainData.map((point, idx) => (
            <rect
              key={idx}
              x={point.x * 40}
              y={point.y * 40}
              width={40}
              height={40}
              fill={getMoistureColor(point.moisture)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
            />
          ))}

          {/* Add some contour lines */}
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="400"
            stroke="rgba(100,255,180,0.2)"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="400"
            stroke="rgba(100,255,180,0.2)"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="400"
            stroke="rgba(100,255,180,0.2)"
            strokeWidth={2}
            strokeDasharray="5,5"
          />

          {/* Field boundary */}
          <rect
            x={0}
            y={0}
            width={400}
            height={400}
            fill="none"
            stroke="#64ffb4"
            strokeWidth={2}
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="border-t border-border p-2 sm:p-3 bg-card flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 justify-center text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-4 h-4 sm:w-6 sm:h-6 rounded"
              style={{ backgroundColor: getMoistureColor(0) }}
            ></div>
            <span className="text-muted-foreground">Dry</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-4 h-4 sm:w-6 sm:h-6 rounded"
              style={{ backgroundColor: getMoistureColor(0.5) }}
            ></div>
            <span className="text-muted-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-4 h-4 sm:w-6 sm:h-6 rounded"
              style={{ backgroundColor: getMoistureColor(1) }}
            ></div>
            <span className="text-muted-foreground">Wet</span>
          </div>
        </div>
      </div>
    </div>
  )
}
