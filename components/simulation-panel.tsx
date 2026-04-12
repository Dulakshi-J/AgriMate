'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'

interface SimulationPanelProps {
  currentCrop?: string
  alternativeCrop?: string
}

/**
 * SimulationPanel - Split-view crop comparison with rainfall slider
 */
export function SimulationPanel({
  currentCrop = 'Wheat',
  alternativeCrop = 'Rice',
}: SimulationPanelProps) {
  const [rainfall, setRainfall] = useState(50)

  // Mock yield data
  const baseYield = { [currentCrop]: 45, [alternativeCrop]: 42 }
  const adjustedYield = {
    [currentCrop]: Math.max(20, baseYield[currentCrop] - (rainfall - 50) * 0.3),
    [alternativeCrop]: Math.max(20, baseYield[alternativeCrop] + (rainfall - 50) * 0.2),
  }

  return (
    <div className="space-y-6">
      {/* Rainfall Slider */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold font-poppins text-foreground mb-3">
            Adjust Rainfall: {rainfall}mm
          </h3>
          <Slider
            value={[rainfall]}
            onValueChange={(value) => setRainfall(value[0])}
            min={20}
            max={150}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Low (20mm)</span>
            <span>Optimal (50mm)</span>
            <span>High (150mm)</span>
          </div>
        </div>
      </div>

      {/* Split comparison view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Crop */}
        <div className="p-6 rounded-lg bg-card border border-border space-y-4">
          <h4 className="font-bold font-poppins text-foreground">{currentCrop} (Current)</h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Expected Yield</p>
                <p className="font-semibold text-foreground">{adjustedYield[currentCrop].toFixed(1)} kg/ha</p>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(adjustedYield[currentCrop] / 60) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Irrigation Need</p>
                <p className="font-semibold text-foreground">{(80 - rainfall * 0.3).toFixed(0)}%</p>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, 80 - rainfall * 0.3)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Disease Risk</p>
                <p className="font-semibold text-foreground">
                  {rainfall > 80 ? 'High' : rainfall > 50 ? 'Medium' : 'Low'}
                </p>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-destructive transition-all"
                  style={{
                    width: `${rainfall > 80 ? 100 : rainfall > 50 ? 50 : 25}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Recommendation: {rainfall > 80 ? 'Risk of fungal diseases. Increase ventilation.' : 'Conditions favorable'}
            </p>
          </div>
        </div>

        {/* Alternative Crop */}
        <div className="p-6 rounded-lg bg-card border border-border/50 space-y-4">
          <h4 className="font-bold font-poppins text-foreground">{alternativeCrop} (Alternative)</h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Expected Yield</p>
                <p className="font-semibold text-foreground text-primary">{adjustedYield[alternativeCrop].toFixed(1)} kg/ha</p>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(adjustedYield[alternativeCrop] / 60) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Irrigation Need</p>
                <p className="font-semibold text-foreground">{(60 - rainfall * 0.2).toFixed(0)}%</p>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.max(0, 60 - rainfall * 0.2)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Market Demand</p>
                <p className="font-semibold text-foreground">Moderate</p>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all w-1/2" />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Better suited for high rainfall seasons. Consider switching.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm font-semibold text-foreground mb-2">Simulation Summary</p>
        <p className="text-sm text-muted-foreground">
          At {rainfall}mm rainfall, {alternativeCrop} shows {Math.abs(adjustedYield[alternativeCrop] - adjustedYield[currentCrop]).toFixed(1)} kg/ha{' '}
          {adjustedYield[alternativeCrop] > adjustedYield[currentCrop] ? 'higher' : 'lower'} yield than {currentCrop}.
        </p>
      </div>
    </div>
  )
}
