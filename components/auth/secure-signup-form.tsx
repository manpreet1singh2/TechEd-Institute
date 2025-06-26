"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle, Shield } from "lucide-react"
import { createUser, validatePassword, validateEmail, storeOTP } from "@/lib/auth-utils"
import OTPVerification from "./otp-verification"

interface SecureSignupFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function SecureSignupForm({ onSuccess, onSwitchToLogin }: SecureSignupFormProps) {
  const [currentStep, setCurrentStep] = useState<"form" | "otp">("form")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{ isValid: boolean; errors: string[] }>({
    isValid: false,
    errors: [],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear field-specific error
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Real-time password validation
    if (field === "password") {
      setPasswordStrength(validatePassword(value))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!passwordStrength.isValid) {
      newErrors.password = passwordStrength.errors[0]
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
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

      const result = createUser(formData.username, formData.email, formData.password)

      if (result.success && result.requiresOTP) {
        // Generate OTP
        const otpResult = storeOTP(formData.email, "signup")

        if (otpResult.success) {
          setCurrentStep("otp")
          // Show alert about OTP
          alert(
            `🔐 Security Verification Required!\n\nAn OTP has been sent to: ${formData.email}\n\nFor demo purposes, check the console for your OTP.\n\nTechMindsHub - Secure Registration`,
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

  const handleOTPSuccess = () => {
    onSuccess()
  }

  const handleOTPBack = () => {
    setCurrentStep("form")
  }

  if (currentStep === "otp") {
    return (
      <OTPVerification
        email={formData.email}
        type="signup"
        onSuccess={handleOTPSuccess}
        onBack={handleOTPBack}
        userData={formData}
      />
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-blue-100">
      <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Join TechMindsHub
        </CardTitle>
        <CardDescription className="text-gray-600">
          🎓 Industrial Training in IT & HR | Secure Registration
        </CardDescription>
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
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>🔒 Secure Registration:</strong> OTP verification required for account security
            </AlertDescription>
          </Alert>

          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-medium">
              Username *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`pl-10 border-2 focus:border-blue-500 ${errors.username ? "border-red-500" : "border-gray-200"}`}
                disabled={isLoading}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.username}
              </p>
            )}
          </div>

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
                placeholder="Enter your email address"
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
                placeholder="Create a strong password"
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-1">
                {passwordStrength.errors.map((error, index) => (
                  <p key={index} className="text-xs text-red-500 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {error}
                  </p>
                ))}
                {passwordStrength.isValid && (
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Password is strong! ✅
                  </p>
                )}
              </div>
            )}
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
              Confirm Password *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`pl-10 pr-10 border-2 focus:border-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {errors.confirmPassword}
              </p>
            )}
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
                Creating Account...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Create Secure Account
              </div>
            )}
          </Button>

          {/* Switch to Login */}
          <div className="text-center text-sm pt-4 border-t border-gray-200">
            <span className="text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              disabled={isLoading}
            >
              Sign In Here
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center text-xs text-gray-500 pt-2">
            <p>
              Need help? Call us:{" "}
              <a href="tel:8847507316" className="text-blue-600">
                8847507316
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:trainings@techmindshub.in" className="text-blue-600">
                trainings@techmindshub.in
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
