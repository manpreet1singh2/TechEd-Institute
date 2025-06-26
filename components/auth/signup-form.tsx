"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle } from "lucide-react"
import { createUser, validatePassword, validateEmail } from "@/lib/auth-utils"
import { storeOTP } from "@/lib/auth-utils"
import { completeUserCreation } from "@/lib/auth-utils"
import OTPVerification from "./otp-verification"

interface SignupFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
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
  const [showOTP, setShowOTP] = useState(false)
  const [pendingUserData, setPendingUserData] = useState<{
    username: string
    email: string
    password: string
  } | null>(null)

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
      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = createUser(formData.username, formData.email, formData.password)

      if (result.success && result.requiresOTP) {
        // Generate and store OTP
        const otpResult = storeOTP(formData.email, "signup")

        if (otpResult.success) {
          setPendingUserData({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          })
          setShowOTP(true)
        } else {
          setErrors({ general: otpResult.message })
        }
      } else if (!result.success) {
        setErrors({ general: result.message })
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPSuccess = async () => {
    if (!pendingUserData) return

    try {
      const result = completeUserCreation(pendingUserData.username, pendingUserData.email, pendingUserData.password)

      if (result.success) {
        onSuccess()
      } else {
        setErrors({ general: result.message })
        setShowOTP(false)
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." })
      setShowOTP(false)
    }
  }

  const handleOTPBack = () => {
    setShowOTP(false)
    setPendingUserData(null)
  }

  if (showOTP && pendingUserData) {
    return (
      <OTPVerification
        email={pendingUserData.email}
        type="signup"
        onSuccess={handleOTPSuccess}
        onBack={handleOTPBack}
        userData={pendingUserData}
      />
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Join TechMindsHub
        </CardTitle>
        <CardDescription>Create your account to access our professional courses</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`pl-10 ${errors.username ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
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
                    Password meets all requirements
                  </p>
                )}
              </div>
            )}
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
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
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          {/* Switch to Login */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
              disabled={isLoading}
            >
              Sign in here
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
