"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, RefreshCw, Clock, CheckCircle, XCircle } from "lucide-react"
import { verifyOTP, storeOTP } from "@/lib/auth-utils"

interface OTPVerificationProps {
  email: string
  type: "signup" | "login"
  onSuccess: () => void
  onBack: () => void
  userData?: {
    username: string
    password: string
    rememberMe?: boolean
  }
}

export default function OTPVerification({ email, type, onSuccess, onBack, userData }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take the last digit
    setOtp(newOtp)

    // Clear error when user starts typing
    if (error) setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerifyOTP(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

    if (pastedData.length === 6) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)
      handleVerifyOTP(pastedData)
    }
  }

  const handleVerifyOTP = async (otpValue: string) => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = verifyOTP(email, type, otpValue)

      if (result.success) {
        onSuccess()
      } else {
        setError(result.message)
        // Clear OTP inputs on error
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setError("")

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = storeOTP(email, type)

      if (result.success) {
        setTimeLeft(300) // Reset timer
        setCanResend(false)
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()

        // Show success message briefly
        setError("")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP")
      return
    }

    handleVerifyOTP(otpValue)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Verify Your Email
        </CardTitle>
        <CardDescription>
          We've sent a 6-digit verification code to
          <br />
          <span className="font-medium text-gray-900">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* OTP Input Fields */}
          <div className="space-y-2">
            <Label className="text-center block">Enter Verification Code</Label>
            <div className="flex justify-center space-x-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-bold border-2 focus:border-blue-500"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          {/* Timer and Resend */}
          <div className="text-center space-y-2">
            {timeLeft > 0 ? (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Code expires in {formatTime(timeLeft)}</span>
              </div>
            ) : (
              <div className="text-sm text-red-600">
                <XCircle className="w-4 h-4 inline mr-1" />
                Code has expired
              </div>
            )}

            <div>
              <span className="text-sm text-gray-600">Didn't receive the code? </span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={!canResend || isResending}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <span className="flex items-center">
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Resend Code"
                )}
              </button>
            </div>
          </div>

          {/* Console Instructions */}
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Demo Mode:</strong> Check your browser console for the OTP code.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isLoading || otp.some((digit) => !digit)}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Verify Code
              </div>
            )}
          </Button>

          {/* Back Button */}
          <Button type="button" variant="ghost" onClick={onBack} className="w-full" disabled={isLoading}>
            Back to {type === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
