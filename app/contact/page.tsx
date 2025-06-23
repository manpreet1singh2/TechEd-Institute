"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, Clock, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any queries, course information, or assistance. We're here to help you start your
            learning journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your interest in our courses or any questions you have..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800 font-medium">Message sent successfully!</p>
                      <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800 font-medium">Failed to send message.</p>
                      <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        123 Tech Street
                        <br />
                        Innovation City, TC 12345
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+91 91158 13846</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">dimplebrar13@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Office Hours</p>
                      <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-pink-600 mr-2" />
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700 mr-2" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-sm font-medium">Twitter</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-purple-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Ready to Start Learning?</h3>
                <p className="text-blue-100 mb-4">
                  Join thousands of students who have transformed their careers with our professional training courses.
                </p>
                <Button
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => {
                    const modal = document.getElementById("apply-now-modal")
                    if (modal) modal.style.display = "block"
                  }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
