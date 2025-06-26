"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, GraduationCap, PlayCircle, User, LogOut, BookOpen, Shield, Phone } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth-utils"
import AuthModal from "@/components/auth/auth-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "signup" }>({
    isOpen: false,
    mode: "login",
  })
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check for logged in user on component mount and after auth changes
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleAuthSuccess = () => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    // Show success message
    if (currentUser) {
      alert(`🎉 Welcome ${currentUser.username}!\n\nWelcome to TechMindsHub!\n\n🎓 Industrial Training in IT & HR`)
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setIsMenuOpen(false)
    alert("👋 Logout Successful!\n\nThank you for visiting TechMindsHub!\n\nSee you again soon!")
  }

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthModal({ isOpen: true, mode })
    setIsMenuOpen(false)
  }

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: "login" })
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-md"
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechMindsHub
                </span>
                <p className="text-xs text-gray-500 -mt-1">🎓 Industrial Training in IT & HR</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors hover:text-blue-600 ${
                    pathname === item.href ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => {
                      const modal = document.getElementById("apply-now-modal")
                      if (modal) modal.style.display = "flex"
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <span className="font-medium text-gray-700">{user.username}</span>
                          <p className="text-xs text-gray-500">Verified ✅</p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <Shield className="w-3 h-3" />
                          Secure Account
                        </p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-courses" className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          My Courses
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Secure Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => openAuthModal("login")}
                    className="font-medium hover:bg-blue-50"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Secure Login
                  </Button>
                  <Button
                    onClick={() => openAuthModal("signup")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Join TechMindsHub
                  </Button>
                </div>
              )}

              {/* Contact Button */}
              <a
                href="tel:8847507316"
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">8847507316</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors hover:text-blue-600 ${
                      pathname === item.href ? "text-blue-600" : "text-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {user ? (
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <span className="font-medium">{user.username}</span>
                        <p className="text-xs text-green-600">Verified ✅</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/my-courses"
                      className="block text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Courses
                    </Link>
                    <button onClick={handleLogout} className="block text-red-600 hover:text-red-700 text-left">
                      Secure Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <Button variant="ghost" onClick={() => openAuthModal("login")} className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Secure Login
                    </Button>
                    <Button
                      onClick={() => openAuthModal("signup")}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Join TechMindsHub
                    </Button>
                  </div>
                )}

                {/* Mobile Contact */}
                <div className="pt-2 border-t border-gray-200">
                  <a
                    href="tel:8847507316"
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call: 8847507316</span>
                  </a>
                  <a
                    href="https://wa.me/918847507316"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium mt-2"
                  >
                    <span>💬 WhatsApp: 8847507316</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialMode={authModal.mode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  )
}
