"use client"

import { useEffect, useState } from "react"

export default function LiveCounter() {
  const [liveCount, setLiveCount] = useState(127)
  const [todayVisits, setTodayVisits] = useState(2847)

  useEffect(() => {
    // Simulate live counter updates
    const interval = setInterval(() => {
      // Random chance to update counters
      if (Math.random() < 0.3) {
        setLiveCount((prev) => {
          const change = Math.random() < 0.6 ? 1 : -1
          const newCount = prev + change
          return Math.max(50, Math.min(300, newCount)) // Keep between 50-300
        })
      }

      if (Math.random() < 0.1) {
        setTodayVisits((prev) => prev + 1)
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 py-4 text-center border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-8 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span>
              Live Visitors: <span className="font-bold text-green-400">{liveCount}</span>
            </span>
          </div>
          <div>
            <span>
              Total Visits Today: <span className="font-bold text-blue-400">{todayVisits.toLocaleString()}</span>
            </span>
          </div>
          <div>
            <span>
              Applications This Month: <span className="font-bold text-purple-400">156</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
