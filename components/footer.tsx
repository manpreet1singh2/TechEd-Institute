"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, GraduationCap } from "lucide-react"

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
    { name: "Facebook", href: "https://facebook.com/techmindsHub", icon: Facebook, color: "hover:text-blue-600" },
    { name: "Instagram", href: "https://instagram.com/techmindsHub", icon: Instagram, color: "hover:text-pink-600" },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/techmindsHub",
      icon: Linkedin,
      color: "hover:text-blue-700",
    },
    { name: "Twitter", href: "https://twitter.com/techmindsHub", icon: Twitter, color: "hover:text-blue-400" },
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
                <p className="text-sm text-gray-400">Professional Training</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students with job-ready skills through practical, project-based learning. Join thousands of
              successful graduates who have transformed their careers with us.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
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
            <h4 className="text-xl font-bold mb-6">Popular Courses</h4>
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
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Tech Street
                    <br />
                    Innovation City, TC 12345
                    <br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <a href="tel:+919115813846" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +91 91158 13846
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:dimplebrar13@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  dimplebrar13@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <h5 className="font-bold mb-2">Office Hours</h5>
              <p className="text-sm text-blue-100">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">© {currentYear} TechMindsHub. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">Transforming careers through quality education since 2018</p>
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
    </footer>
  )
}
