"use client"

import { getSeededRGB } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react"
import { v5 as uuid } from "uuid";
interface MouseBlobProps {
  mousePosition: { x: number; y: number },
  followMouse?: boolean
}

const d = new Date()
const MonthDay = `${d.getMonth()}${d.getDate()}`

export function MouseBlob({ mousePosition, followMouse }: MouseBlobProps) {
  const blobRef = useRef<SVGPathElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [time, setTime] = useState(0)
  const animationRef = useRef<number>(null)
  const c1 = useMemo(() => getSeededRGB(MonthDay), []);
  const c2 = useMemo(() => getSeededRGB(MonthDay), []);
  const c3 = useMemo(() => getSeededRGB(MonthDay), []);
  // Lerp function for smooth interpolation
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  useEffect(() => {

    // Initialize position to mouse position on first render
    if (position.x === 0 && position.y === 0) {
      setPosition({ x: mousePosition.x, y: mousePosition.y })
    }

    // Animation function for smooth following, rotation and time-based animation
    const animate = () => {
      setPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.05),
        y: lerp(prev.y, mousePosition.y, 0.05),
      }))

      // Increment rotation for continuous spinning
      setRotation((prev) => (prev + 0.005) % (Math.PI * 2))

      // Increment time for wobble effect
      setTime((prev) => prev + 0.01)

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  useEffect(() => {
    if (!blobRef.current || !wrapperRef.current) return

    // Base radius with some time-based pulsing
    const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.10
    const points = 5 // More points for more detail
    const slice = (Math.PI * 2) / points

    let path = ""

    for (let i = 0; i < points; i++) {
      // Add rotation to the angle
      const angle = slice * i + rotation

      // Create uneven radius with multiple sine waves of different frequencies
      const radiusVariation =
        Math.sin(i * 0.5 + time) * 20 + Math.sin(i * 1.3 + time * 1.5) * 15 + Math.sin(i * 2.7 + time * 0.7) * 10

      // Calculate radius with variation for uneven shape
      const currentRadius = baseRadius + radiusVariation

      // Calculate point position
      const x = position.x + currentRadius * Math.cos(angle)
      const y = position.y + currentRadius * Math.sin(angle)

      if (i === 0) {
        path += `M ${x},${y} `
      } else {
        // Use quadratic curves for smoother blob
        const prevAngle = slice * (i - 1) + rotation
        const cpX = position.x + currentRadius * 1.2 * Math.cos((prevAngle + angle) / 2)
        const cpY = position.y + currentRadius * 1.2 * Math.sin((prevAngle + angle) / 2)

        path += `Q ${cpX},${cpY} ${x},${y} `
      }
    }

    // Close the path with a quadratic curve back to the start
    const firstX = position.x + (baseRadius + Math.sin(time) * 20) * Math.cos(rotation)
    const firstY = position.y + (baseRadius + Math.sin(time) * 20) * Math.sin(rotation)

    const lastAngle = slice * (points - 1) + rotation
    const cpX = position.x + baseRadius * 1.2 * Math.cos((lastAngle + rotation) / 2)
    const cpY = position.y + baseRadius * 1.2 * Math.sin((lastAngle + rotation) / 2)

    path += `Q ${cpX},${cpY} ${firstX},${firstY} Z`

    blobRef.current.setAttribute("d", path)

    // Position the wrapper to follow the interpolated position
    wrapperRef.current.style.transform = `translate3d(${position.x - window.innerWidth / 2}px, ${position.y - window.innerHeight / 2}px, 0)`
  }, [position, rotation, time])

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-75">
      <svg className="h-full w-full" viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}>
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="50%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>
        <path ref={blobRef} fill="url(#blob-gradient)" filter="blur(69px)" />
      </svg>
    </div>
  )
}

