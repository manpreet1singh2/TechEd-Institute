"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, XCircle, LogIn } from "lucide-react"
import { loginUser, storeOTP, completeLogin } from "@/lib/auth-utils"
import OTPVerification from "./otp-verification"

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToSignup: () => void
}

export default function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
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
      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = loginUser(formData.email, formData.password, formData.rememberMe)

      if (result.success && result.requiresOTP && result.user) {
        // Generate and store OTP
        const otpResult = storeOTP(formData.email, "login")

        if (otpResult.success) {
          setPendingUser(result.user)
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
    if (!pendingUser) return

    try {
      const result = completeLogin(pendingUser, formData.rememberMe)

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
    setPendingUser(null)
  }

  const handleForgotPassword = () => {
    alert(
      "For password reset assistance, please contact TechMindsHub:\n\nEmail: trainings@techmindshub.in\nPhone: +91 8847507316",
    )
  }

  if (showOTP && pendingUser) {
    return (
      <OTPVerification
        email={formData.email}
        type="login"
        onSuccess={handleOTPSuccess}
        onBack={handleOTPBack}
        userData={{
          username: pendingUser.username,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }}
      />
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription>Sign in to access your TechMindsHub courses</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

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
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
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
              <Label htmlFor="rememberMe" className="text-sm">
                Remember me
              </Label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700"
              disabled={isLoading}
            >
              Forgot password?
            </button>
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
                Signing In...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </div>
            )}
          </Button>

          {/* Switch to Signup */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-medium"
              disabled={isLoading}
            >
              Create one here
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
