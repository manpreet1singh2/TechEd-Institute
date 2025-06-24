"use client"

import { useEffect, useState } from "react"

export default function DebugInfo() {
  const [mounted, setMounted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)

    // Check for common issues
    const checkErrors = () => {
      const newErrors: string[] = []

      // Check if required elements exist
      if (!document.getElementById("apply-now-modal")) {
        newErrors.push("Apply Now Modal not found")
      }

      // Check for JavaScript errors
      window.addEventListener("error", (e) => {
        newErrors.push(`JS Error: ${e.message}`)
        setErrors((prev) => [...prev, `JS Error: ${e.message}`])
      })

      setErrors(newErrors)
    }

    // Run checks after a short delay to ensure DOM is ready
    setTimeout(checkErrors, 1000)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <div className="font-bold mb-2">Debug Info:</div>
      <div>Mounted: ✅</div>
      <div>Errors: {errors.length === 0 ? "None ✅" : errors.join(", ")}</div>
    </div>
  )
}
