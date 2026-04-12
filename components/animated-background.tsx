'use client'

import React, { useEffect, useRef } from 'react'

/**
 * AnimatedBackground component with glowing mesh network effect
 * Used on the role selection screen to create visual interest
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create mesh nodes with glow effect
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = []
    const nodeCount = 8

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 2 + Math.random() * 3,
      })
    }

    let animationId: number

    const animate = () => {
      // Clear canvas with semi-transparent background for trailing effect
      ctx.fillStyle = 'rgba(11, 26, 11, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Wrap around edges
        if (node.x < 0) node.x = canvas.width
        if (node.x > canvas.width) node.x = 0
        if (node.y < 0) node.y = canvas.height
        if (node.y > canvas.height) node.y = 0

        // Draw glowing node
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3)
        gradient.addColorStop(0, 'rgba(100, 255, 180, 0.8)')
        gradient.addColorStop(1, 'rgba(100, 255, 180, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(node.x - node.size * 3, node.y - node.size * 3, node.size * 6, node.size * 6)

        // Draw core node
        ctx.fillStyle = '#64ffb4'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            const opacity = 1 - distance / 200
            ctx.strokeStyle = `rgba(100, 255, 180, ${opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: '#0b1a0b' }}
    />
  )
}
