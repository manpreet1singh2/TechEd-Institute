"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Users, Award, BookOpen, Building, Star, Clock, Globe } from "lucide-react"
import { SimpleCounter } from "./simple-counter"

interface CounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ target, duration = 2500, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const currentRef = counterRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Smooth easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * target)

      setCount(currentCount)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isVisible, target, duration])

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold mb-2 text-white">
      {prefix}
      {count.toLocaleString()}
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Our Success in Numbers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Proven track record of excellence in education and industry-leading placement rates
            </p>
          </div>

          {/* Primary Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <SimpleCounter target={25000} suffix="+" />
                <div className="text-lg font-semibold mb-1">Students Trained</div>
                <div className="text-blue-200 text-sm">Since 2018</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-200" />
                <SimpleCounter target={94} suffix="%" />
                <div className="text-lg font-semibold mb-1">Placement Rate</div>
                <div className="text-blue-200 text-sm">Industry Leading</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-200" />
                <SimpleCounter target={11} />
                <div className="text-lg font-semibold mb-1">Professional Courses</div>
                <div className="text-blue-200 text-sm">Industry Focused</div>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Award className="w-12 h-12 mx-auto mb-4 text-yellow-200" />
                <SimpleCounter target={75} suffix="+" />
                <div className="text-lg font-semibold mb-1">Expert Instructors</div>
                <div className="text-blue-200 text-sm">Industry Veterans</div>
              </div>
            </div>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Clock className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <SimpleCounter target={6} />
                <div className="text-sm font-semibold">Years Excellence</div>
                <div className="text-blue-200 text-xs">Est. 2018</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Building className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <SimpleCounter target={750} suffix="+" />
                <div className="text-sm font-semibold">Partner Companies</div>
                <div className="text-blue-200 text-xs">Hiring Alumni</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Star className="w-8 h-8 mx-auto mb-3 text-yellow-200" />
                <SimpleCounter target={98} suffix="%" />
                <div className="text-sm font-semibold">Satisfaction Rate</div>
                <div className="text-blue-200 text-xs">Student Reviews</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Globe className="w-8 h-8 mx-auto mb-3 text-purple-200" />
                <SimpleCounter target={45} suffix="+" />
                <div className="text-sm font-semibold">Countries</div>
                <div className="text-blue-200 text-xs">Global Reach</div>
              </div>
            </div>
          </div>

          {/* Achievement Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">₹12.5 LPA</h3>
              <p className="text-blue-100">Highest Package Offered</p>
              <p className="text-sm text-blue-200 mt-1">Software Development Graduate</p>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">15 Days</h3>
              <p className="text-blue-100">Average Placement Time</p>
              <p className="text-sm text-blue-200 mt-1">After Course Completion</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
              <p className="text-blue-100">Average Course Rating</p>
              <p className="text-sm text-blue-200 mt-1">Based on 5000+ Reviews</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
