"use client"

import { useEffect, useState } from "react"

export default function CounterDebug() {
  const [debugInfo, setDebugInfo] = useState({
    mounted: false,
    intersectionObserver: false,
    errors: [] as string[],
  })

  useEffect(() => {
    setDebugInfo((prev) => ({ ...prev, mounted: true }))

    // Test Intersection Observer
    if (typeof IntersectionObserver !== "undefined") {
      setDebugInfo((prev) => ({ ...prev, intersectionObserver: true }))
    } else {
      setDebugInfo((prev) => ({
        ...prev,
        errors: [...prev.errors, "IntersectionObserver not supported"],
      }))
    }

    // Test requestAnimationFrame
    if (typeof requestAnimationFrame === "undefined") {
      setDebugInfo((prev) => ({
        ...prev,
        errors: [...prev.errors, "requestAnimationFrame not supported"],
      }))
    }
  }, [])

  return (
    <div className="fixed top-20 right-4 bg-red-500 text-white p-2 rounded text-xs z-50 max-w-xs">
      <div>Mounted: {debugInfo.mounted ? "✅" : "❌"}</div>
      <div>IntersectionObserver: {debugInfo.intersectionObserver ? "✅" : "❌"}</div>
      <div>Errors: {debugInfo.errors.length || "None"}</div>
      {debugInfo.errors.map((error, i) => (
        <div key={i} className="text-yellow-200">
          {error}
        </div>
      ))}
    </div>
  )
}
