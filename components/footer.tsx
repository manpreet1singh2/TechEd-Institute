"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, GraduationCap, Youtube, MessageCircle } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const popularCourses = [
    { name: "Software Development", href: "/courses" },
    { name: "Data Science & ML", href: "/courses" },
    { name: "AI & Deep Learning", href: "/courses" },
    { name: "Cloud & DevOps", href: "/courses" },
    { name: "Cybersecurity", href: "/courses" },
    { name: "Digital Marketing", href: "/courses" },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/trainings_techmindshub?igsh=MWg0YzBkNzk0ZmE5ZQ==",
      icon: Instagram,
      color: "hover:text-pink-600",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/16MQY9Soy9/",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@training_techmindshub?si=EqTMvjogm3o2LD2u",
      icon: Youtube,
      color: "hover:text-red-500",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/training-techmindshub/",
      icon: Linkedin,
      color: "hover:text-blue-700",
    },
  ]

  const handleApplyNowClick = () => {
    try {
      const modal = document.getElementById("apply-now-modal")
      if (modal) {
        modal.style.display = "flex"
        modal.classList.add("show")
      }
    } catch (error) {
      console.error("Error opening apply modal:", error)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">TechMindsHub</h3>
                <p className="text-sm text-gray-400">🎓 Industrial Training in IT & HR</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              <strong>Shaping the workforce of tomorrow</strong> through comprehensive IT and HR training programs.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Join thousands of professionals who have advanced their careers with our industry-focused courses.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-110 transform duration-200`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleApplyNowClick}
                  className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 text-left"
                >
                  Apply Now
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-purple-400">Popular Courses</h4>
            <ul className="space-y-3">
              {popularCourses.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-200 block"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-green-400">Contact Us</h4>
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <div>
                  <a
                    href="tel:8847507316"
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    8847507316
                  </a>
                  <p className="text-xs text-gray-500">Phone & WhatsApp</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <div>
                  <a
                    href="https://wa.me/918847507316"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    WhatsApp Chat
                  </a>
                  <p className="text-xs text-gray-500">Quick Support</p>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <a
                    href="mailto:trainings@techmindshub.in"
                    className="text-gray-300 hover:text-white transition-colors text-sm block font-medium"
                  >
                    trainings@techmindshub.in
                  </a>
                  <a
                    href="mailto:techmindshub143@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors text-sm block"
                  >
                    techmindshub143@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong>Plot No. C133, 4th Floor</strong>
                    <br />
                    Phase 8, Industrial Area
                    <br />
                    Mohali, Punjab - 160062
                    <br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <h5 className="font-bold mb-2 text-white">Office Hours</h5>
              <p className="text-sm text-blue-100">
                <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                <br />
                <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                <br />
                <strong>Sunday:</strong> Closed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">© {currentYear} TechMindsHub. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">
                🎓 <strong>Industrial Training in IT & HR</strong> | Shaping the workforce of tomorrow
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/918847507316"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden group-hover:block text-sm font-medium pr-2">WhatsApp</span>
        </a>
      </div>
    </footer>
  )
}
