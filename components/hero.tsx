"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Master Your Future with Software Development",
      subtitle: "Build industry-ready applications with cutting-edge technologies",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Master Your Future with Data Science & AI",
      subtitle: "Unlock the power of data and artificial intelligence",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Master Your Future with Cloud & DevOps",
      subtitle: "Scale applications with modern cloud infrastructure",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Master Your Future with Cybersecurity",
      subtitle: "Protect digital assets with advanced security practices",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Master Your Future with Digital Marketing",
      subtitle: "Drive business growth through strategic digital campaigns",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-gray-900"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{slides[currentSlide].title}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{slides[currentSlide].subtitle}</p>
          <p className="text-lg mb-12 max-w-3xl mx-auto opacity-80">
            Welcome to TechEd Institute, your gateway to industry-ready skills in technology and management. Explore our
            11 cutting-edge courses designed for real-world success.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            onClick={() => {
              const modal = document.getElementById("apply-now-modal")
              if (modal) modal.style.display = "block"
            }}
          >
            <PlayCircle className="w-6 h-6 mr-2" />
            Apply Now
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 z-20"
      >
        <ChevronLeft className="w-12 h-12" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 z-20"
      >
        <ChevronRight className="w-12 h-12" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
