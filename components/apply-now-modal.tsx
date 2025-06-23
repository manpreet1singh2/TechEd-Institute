"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, PlayCircle, CheckCircle, AlertCircle } from "lucide-react"

export default function ApplyNowModal() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    duration: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const courses = [
    "Software Development",
    "Data Science & Machine Learning",
    "Artificial Intelligence & Deep Learning",
    "Cloud & DevOps",
    "Cybersecurity",
    "Mobile App Development",
    "Programming Languages & Foundations",
    "Big Data & Analytics",
    "Testing & QA",
    "Human Resource Management",
    "Digital Marketing",
  ]

  const durations = ["6 Months", "3 Months", "45 Days"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          course: "",
          duration: "",
          message: "",
        })
        setTimeout(() => {
          closeModal()
        }, 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const closeModal = () => {
    const modal = document.getElementById("apply-now-modal")
    if (modal) modal.style.display = "none"
    setSubmitStatus(null)
  }

  return (
    <div
      id="apply-now-modal"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4"
      style={{ display: "none" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-8 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-bold flex items-center">
              <PlayCircle className="w-8 h-8 mr-3" />
              Apply Now
            </h2>
            <p className="text-blue-100 mt-2">Start your journey to a successful career</p>
          </div>
          <button onClick={closeModal} className="text-white hover:text-gray-200 transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="h-12 border-2 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="h-12 border-2 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 123-4567"
                className="h-12 border-2 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Course *</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Duration *</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Select duration</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message (Optional)</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your background, career goals, or any specific questions..."
              className="border-2 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={closeModal} className="flex-1 h-12 border-2">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>

          {submitStatus === "success" && (
            <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-xl">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-800 font-bold text-lg mb-2">Application Submitted Successfully!</p>
              <p className="text-green-600">We'll contact you within 24 hours to discuss your enrollment.</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="text-center p-6 bg-red-50 border-2 border-red-200 rounded-xl">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <p className="text-red-800 font-bold text-lg mb-2">Submission Failed</p>
              <p className="text-red-600">Please try again or contact us directly at info@techedinstitute.com</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
