"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/images/hero-1.png",
      title: "Master Your Future with Software Development",
      subtitle: "Build industry-ready applications with cutting-edge technologies and frameworks",
      course: "Software Development",
    },
    {
      image: "/images/hero-2.png",
      title: "Master Your Future with Data Science & Machine Learning",
      subtitle: "Unlock the power of data and create intelligent systems that drive business decisions",
      course: "Data Science & ML",
    },
    {
      image: "/images/hero-3.png",
      title: "Master Your Future with Artificial Intelligence",
      subtitle: "Dive deep into AI and neural networks with TensorFlow and cutting-edge techniques",
      course: "Artificial Intelligence",
    },
    {
      image: "/images/hero-4.png",
      title: "Master Your Future with Cloud & DevOps",
      subtitle: "Scale applications with modern cloud infrastructure and DevOps practices",
      course: "Cloud & DevOps",
    },
    {
      image: "/images/hero-5.png",
      title: "Master Your Future with Cybersecurity",
      subtitle: "Protect digital assets with advanced security practices and ethical hacking",
      course: "Cybersecurity",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
            }}
          />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div className="max-w-5xl px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-90 font-light">
              {slides[currentSlide].subtitle}
            </p>
            <div className="mb-12">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-lg font-medium border border-white/30">
                Featured Course: {slides[currentSlide].course}
              </span>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
              onClick={() => {
                const modal = document.getElementById("apply-now-modal")
                if (modal) modal.style.display = "flex"
              }}
            >
              <PlayCircle className="w-6 h-6 mr-3" />
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors z-20 bg-black/20 hover:bg-black/40 p-3 rounded-full backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors z-20 bg-black/20 hover:bg-black/40 p-3 rounded-full backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
