"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedBlobProps {
  followMouse?: boolean
  minRadius?: number
  maxRadius?: number
  blur?: number
  opacity?: number
  rotationSpeed?: number
  morphSpeed?: number
  followSpeed?: number
  autonomousSpeed?: number
  colors?: [string, string, string]
  zIndex?: number
  enabled?: boolean
  className?: string
}

export function Blob({
  followMouse = false,
  minRadius = 60,
  maxRadius = 120,
  blur = 100,
  opacity = 0.5,
  rotationSpeed = 0.005,
  morphSpeed = 0.01,
  followSpeed = 0.05,
  autonomousSpeed = 0.02,
  colors = ["rgba(120, 58, 180, 0.5)", "rgba(29, 125, 253, 0.5)", "rgba(252, 176, 69, 0.5)"],
  zIndex = 0,
  enabled = true,
  className = "",
}: AnimatedBlobProps) {
  const blobRef = useRef<SVGPathElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [time, setTime] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const animationRef = useRef<number>(null)

  const calculateBaseRadius = () => {
    if (windowSize.width === 0 || windowSize.height === 0) return minRadius

    const smallerDimension = Math.min(windowSize.width, windowSize.height)
    const referenceSize = 1024
    const scaleFactor = Math.min(1, Math.max(0, smallerDimension / referenceSize))

    return minRadius + (maxRadius - minRadius) * scaleFactor
  }

  const baseRadius = calculateBaseRadius()

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  useEffect(() => {
    if (!enabled || !followMouse) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [enabled, followMouse])

  useEffect(() => {
    if (!enabled) return

    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateWindowSize()
    setIsMounted(true)

    window.addEventListener("resize", updateWindowSize)

    return () => {
      window.removeEventListener("resize", updateWindowSize)
    }
  }, [enabled])

  // biome-ignore lint/correctness/useExhaustiveDependencies: its okay, we're okay
  useEffect(() => {
    if (!enabled || !isMounted) return

    if (position.x === 0 && position.y === 0) {
      const initialX = followMouse ? mousePosition.x : windowSize.width / 2
      const initialY = followMouse ? mousePosition.y : windowSize.height / 2
      setPosition({ x: initialX, y: initialY })
    }

    const animate = () => {
      if (followMouse) {
        setPosition((prev) => ({
          x: lerp(prev.x, mousePosition.x, followSpeed),
          y: lerp(prev.y, mousePosition.y, followSpeed),
        }))
      } else {
        const maxBlobRadius = baseRadius + 45

        const safeAreaX = {
          min: maxBlobRadius,
          max: windowSize.width - maxBlobRadius,
        }

        const safeAreaY = {
          min: maxBlobRadius,
          max: windowSize.height - maxBlobRadius,
        }

        const centerX = windowSize.width / 2
        const centerY = windowSize.height / 2

        const xRadius = Math.min(300, (safeAreaX.max - safeAreaX.min) * 0.4)
        const yRadius = Math.min(300, (safeAreaY.max - safeAreaY.min) * 0.4)

        let targetX = centerX + Math.sin(time * 0.5) * xRadius
        let targetY = centerY + Math.cos(time * 0.3) * yRadius

        targetX = Math.max(safeAreaX.min, Math.min(safeAreaX.max, targetX))
        targetY = Math.max(safeAreaY.min, Math.min(safeAreaY.max, targetY))

        setPosition((prev) => ({
          x: lerp(prev.x, targetX, autonomousSpeed),
          y: lerp(prev.y, targetY, autonomousSpeed),
        }))
      }

      setRotation((prev) => (prev + rotationSpeed) % (Math.PI * 2))

      setTime((prev) => prev + morphSpeed)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [
    mousePosition,
    followMouse,
    baseRadius,
    windowSize,
    enabled,
    isMounted,
    followSpeed,
    autonomousSpeed,
    rotationSpeed,
    morphSpeed,
    position.x,
    position.y,
    time,
  ])

  useEffect(() => {
    if (!enabled || !isMounted || !blobRef.current || !wrapperRef.current) return

    const points = 10
    const slice = (Math.PI * 2) / points

    let path = ""

    for (let i = 0; i < points; i++) {
      const angle = slice * i + rotation

      const radiusVariation =
        Math.sin(i * 0.5 + time) * 20 + Math.sin(i * 1.3 + time * 1.5) * 15 + Math.sin(i * 2.7 + time * 0.7) * 10

      const currentRadius = baseRadius + radiusVariation

      const x = position.x + currentRadius * Math.cos(angle)
      const y = position.y + currentRadius * Math.sin(angle)

      if (i === 0) {
        path += `M ${x},${y} `
      } else {
        const prevAngle = slice * (i - 1) + rotation
        const cpX = position.x + currentRadius * 1.2 * Math.cos((prevAngle + angle) / 2)
        const cpY = position.y + currentRadius * 1.2 * Math.sin((prevAngle + angle) / 2)

        path += `Q ${cpX},${cpY} ${x},${y} `
      }
    }

    const firstX = position.x + (baseRadius + Math.sin(time) * 20) * Math.cos(rotation)
    const firstY = position.y + (baseRadius + Math.sin(time) * 20) * Math.sin(rotation)

    const lastAngle = slice * (points - 1) + rotation
    const cpX = position.x + baseRadius * 1.2 * Math.cos((lastAngle + rotation) / 2)
    const cpY = position.y + baseRadius * 1.2 * Math.sin((lastAngle + rotation) / 2)

    path += `Q ${cpX},${cpY} ${firstX},${firstY} Z`

    blobRef.current.setAttribute("d", path)

    wrapperRef.current.style.transform = `translate3d(${position.x - windowSize.width / 2}px, ${position.y - windowSize.height / 2}px, 0)`
  }, [position, rotation, time, baseRadius, windowSize, enabled, isMounted])

  if (!enabled || !isMounted) return null

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none fixed inset-0 flex items-center justify-center ${className}`}
      style={{ zIndex }}
    >
      <svg className="h-full w-full" viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}>
        <title>Animated colorful blob background</title>
        <defs>
          <linearGradient id={`blob-gradient-${zIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        <path ref={blobRef} fill={`url(#blob-gradient-${zIndex})`} filter={`blur(${blur}px)`} style={{ opacity }} />
      </svg>
    </div>
  )
}
