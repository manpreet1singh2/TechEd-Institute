"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Users, Award, BookOpen, Building, Star, Clock } from "lucide-react"

interface CounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ target, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.2 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth easing function (ease-out cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * target)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, target, duration])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString()
    }
    return num.toString()
  }

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold mb-2 text-white">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  )
}

export default function StatsCounter() {
  const [liveStats, setLiveStats] = useState({
    activeStudents: 1247,
    onlineVisitors: 89,
    todayApplications: 23,
    coursesInProgress: 156,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        activeStudents: Math.min(prev.activeStudents + Math.floor(Math.random() * 3), 2500),
        onlineVisitors: Math.max(30, Math.min(prev.onlineVisitors + (Math.random() > 0.5 ? 2 : -1), 200)),
        todayApplications: Math.min(prev.todayApplications + (Math.random() > 0.8 ? 1 : 0), 100),
        coursesInProgress: Math.min(prev.coursesInProgress + (Math.random() > 0.9 ? 1 : 0), 300),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Live Stats Bar */}
      <div className="bg-gray-900 text-white py-3 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span>
                Live Students: <span className="font-bold text-green-400">{liveStats.activeStudents}</span>
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span>
                Online Now: <span className="font-bold text-blue-400">{liveStats.onlineVisitors}</span>
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
              <span>
                Applications Today: <span className="font-bold text-purple-400">{liveStats.todayApplications}</span>
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
              <span>
                Courses Active: <span className="font-bold text-yellow-400">{liveStats.coursesInProgress}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Our Success in Numbers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Proven track record of excellence in education and industry-leading placement rates since 2018
            </p>
          </div>

          {/* Primary Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <AnimatedCounter target={10500} />
                <div className="text-lg font-semibold mb-1">Students Trained</div>
                <div className="text-blue-200 text-sm">Since 2018</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-200" />
                <AnimatedCounter target={95} suffix="%" />
                <div className="text-lg font-semibold mb-1">Placement Rate</div>
                <div className="text-blue-200 text-sm">Industry Leading</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-200" />
                <AnimatedCounter target={45} />
                <div className="text-lg font-semibold mb-1">Professional Courses</div>
                <div className="text-blue-200 text-sm">Industry Focused</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Award className="w-12 h-12 mx-auto mb-4 text-yellow-200" />
                <AnimatedCounter target={30} />
                <div className="text-lg font-semibold mb-1">Expert Instructors</div>
                <div className="text-blue-200 text-sm">Industry Veterans</div>
              </div>
            </div>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Clock className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <AnimatedCounter target={7} />
                <div className="text-sm font-semibold">Years of Excellence</div>
                <div className="text-blue-200 text-xs">Established 2018</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Building className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <AnimatedCounter target={200} suffix="+" />
                <div className="text-sm font-semibold">Companies Hiring</div>
                <div className="text-blue-200 text-xs">Our Alumni</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Star className="w-8 h-8 mx-auto mb-3 text-yellow-200" />
                <AnimatedCounter target={98} suffix="%" />
                <div className="text-sm font-semibold">Student Satisfaction</div>
                <div className="text-blue-200 text-xs">Based on Reviews</div>
              </div>
            </div>
          </div>

          {/* Achievement Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">₹15 LPA</h3>
              <p className="text-blue-100">Highest Package Offered</p>
              <p className="text-sm text-blue-200 mt-1">Software Development Graduate</p>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">12 Days</h3>
              <p className="text-blue-100">Average Placement Time</p>
              <p className="text-sm text-blue-200 mt-1">After Course Completion</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
              <p className="text-blue-100">Average Course Rating</p>
              <p className="text-sm text-blue-200 mt-1">Based on 3000+ Reviews</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
