"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import SecureSignupForm from "./secure-signup-form"
import SecureLoginForm from "./secure-login-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode: "login" | "signup"
  onAuthSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, initialMode, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      onAuthSuccess()
      onClose()
      setShowSuccess(false)
    }, 2000)
  }

  const handleSwitchMode = () => {
    setMode(mode === "login" ? "signup" : "login")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-200"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>

          {showSuccess ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-2xl border-2 border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {mode === "signup" ? "Account Created Successfully!" : "Login Successful!"}
              </h3>
              <p className="text-green-600">
                🎓 Welcome to TechMindsHub! <br />
                Redirecting you now...
              </p>
            </div>
          ) : mode === "signup" ? (
            <SecureSignupForm onSuccess={handleSuccess} onSwitchToLogin={handleSwitchMode} />
          ) : (
            <SecureLoginForm onSuccess={handleSuccess} onSwitchToSignup={handleSwitchMode} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
