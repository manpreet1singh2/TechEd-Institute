"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, XCircle, LogIn, Shield } from "lucide-react"
import { loginUser, storeOTP, completeLogin } from "@/lib/auth-utils"
import OTPVerification from "./otp-verification"

interface SecureLoginFormProps {
  onSuccess: () => void
  onSwitchToSignup: () => void
}

export default function SecureLoginForm({ onSuccess, onSwitchToSignup }: SecureLoginFormProps) {
  const [currentStep, setCurrentStep] = useState<"form" | "otp">("form")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pendingUser, setPendingUser] = useState<any>(null)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear field-specific error
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const result = loginUser(formData.email, formData.password, formData.rememberMe)

      if (result.success && result.requiresOTP && result.user) {
        // Generate OTP
        const otpResult = storeOTP(formData.email, "login")

        if (otpResult.success) {
          setPendingUser(result.user)
          setCurrentStep("otp")
          // Show security alert
          alert(
            `🔐 Security Verification Required!\n\nAn OTP has been sent to: ${formData.email}\n\nFor demo purposes, check the console for your OTP.\n\nTechMindsHub - Secure Login`,
          )
        } else {
          setErrors({ general: otpResult.message })
        }
      } else if (!result.success) {
        setErrors({ general: result.message })
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPSuccess = async () => {
    if (!pendingUser) return

    try {
      const result = completeLogin(pendingUser, formData.rememberMe)
      if (result.success) {
        onSuccess()
      } else {
        setErrors({ general: result.message })
        setCurrentStep("form")
      }
    } catch (error) {
      setErrors({ general: "Login could not be completed. Please try again." })
      setCurrentStep("form")
    }
  }

  const handleOTPBack = () => {
    setCurrentStep("form")
    setPendingUser(null)
  }

  const handleForgotPassword = () => {
    alert(
      `🔐 Password Reset Help\n\nContact TechMindsHub Support:\n\n📞 Phone/WhatsApp: 8847507316\n📧 Email: trainings@techmindshub.in\n📧 Email: techmindshub143@gmail.com\n\n🏢 Office Address:\nPlot No. C133, 4th Floor\nPhase 8, Industrial Area\nMohali, Punjab - 160062\n\nOffice Hours: Mon-Fri 9AM-6PM`,
    )
  }

  if (currentStep === "otp") {
    return (
      <OTPVerification
        email={formData.email}
        type="login"
        onSuccess={handleOTPSuccess}
        onBack={handleOTPBack}
        userData={{
          username: pendingUser?.username || "",
          password: formData.password,
          rememberMe: formData.rememberMe,
        }}
      />
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-blue-100">
      <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back to TechMindsHub
        </CardTitle>
        <CardDescription className="text-gray-600">🎓 Industrial Training in IT & HR | Secure Login</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Security Notice */}
          <Alert className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>🔒 Two-Factor Authentication:</strong> OTP verification for secure access
            </AlertDescription>
          </Alert>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`pl-10 border-2 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`pl-10 pr-10 border-2 focus:border-blue-500 ${errors.password ? "border-red-500" : "border-gray-200"}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me for 7 days
              </Label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In Securely...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Secure Sign In
              </div>
            )}
          </Button>

          {/* Switch to Signup */}
          <div className="text-center text-sm pt-4 border-t border-gray-200">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              disabled={isLoading}
            >
              Register Here
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg text-center text-xs text-gray-600">
            <p className="font-semibold text-gray-700 mb-2">🎓 TechMindsHub Support</p>
            <div className="grid grid-cols-1 gap-1">
              <p>
                📞 Phone/WhatsApp:{" "}
                <a href="tel:8847507316" className="text-blue-600 font-medium">
                  8847507316
                </a>
              </p>
              <p>
                📧{" "}
                <a href="mailto:trainings@techmindshub.in" className="text-blue-600">
                  trainings@techmindshub.in
                </a>
              </p>
              <p>
                📧{" "}
                <a href="mailto:techmindshub143@gmail.com" className="text-blue-600">
                  techmindshub143@gmail.com
                </a>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
