"use client"

import { useEffect, useRef, useState } from "react"

interface SimpleCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function SimpleCounter({ target, suffix = "", prefix = "", duration = 2000 }: SimpleCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const increment = target / (duration / 50) // Update every 50ms
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [hasStarted, target, duration])

  return (
    <div ref={elementRef} className="text-4xl md:text-5xl font-bold mb-2 text-white">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}
