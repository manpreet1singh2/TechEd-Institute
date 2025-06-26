// OTP utilities with security measures for LearnSphere by TechMindsHub
// Note: This uses localStorage and console for prototyping - use proper email/SMS service for production

interface OTPData {
  otp: string
  email: string
  expiresAt: string
  attempts: number
  createdAt: string
  type: "signup" | "login"
}

interface OTPAttempt {
  email: string
  attempts: number
  lastAttempt: string
  lockedUntil?: string
}

// Generate secure 6-digit OTP
export function generateOTP(): string {
  const array = new Uint8Array(3)
  crypto.getRandomValues(array)
  const otp = Array.from(array, (byte) => (byte % 10).toString()).join("")
  return otp.padStart(6, "0")
}

// Store OTP with expiration (5 minutes)
export function storeOTP(email: string, type: "signup" | "login"): { success: boolean; otp?: string; message: string } {
  try {
    // Check rate limiting for OTP generation
    const rateLimitResult = checkOTPRateLimit(email)
    if (!rateLimitResult.allowed) {
      return { success: false, message: rateLimitResult.message }
    }

    const otp = generateOTP()
    const otpData: OTPData = {
      otp,
      email: email.toLowerCase(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
      attempts: 0,
      createdAt: new Date().toISOString(),
      type,
    }

    // Store OTP
    const existingOTPs = getStoredOTPs()
    const filteredOTPs = existingOTPs.filter((o) => o.email !== email.toLowerCase() || o.type !== type)
    filteredOTPs.push(otpData)
    localStorage.setItem("learnsphere_otps", JSON.stringify(filteredOTPs))

    // Record OTP generation attempt
    recordOTPAttempt(email)

    // Simulate email delivery by logging to console
    console.log(`🔐 TechMindsHub OTP for ${email}: ${otp}`)
    console.log(`⏰ OTP expires in 5 minutes`)

    return { success: true, otp, message: "OTP generated successfully" }
  } catch (error) {
    console.error("Error generating OTP:", error)
    return { success: false, message: "Failed to generate OTP" }
  }
}

// Verify OTP
export function verifyOTP(
  email: string,
  enteredOTP: string,
  type: "signup" | "login",
): { success: boolean; message: string } {
  try {
    const otps = getStoredOTPs()
    const otpData = otps.find((o) => o.email === email.toLowerCase() && o.type === type)

    if (!otpData) {
      return { success: false, message: "No OTP found. Please request a new one." }
    }

    // Check if OTP is expired
    if (new Date(otpData.expiresAt) < new Date()) {
      // Remove expired OTP
      removeOTP(email, type)
      return { success: false, message: "OTP has expired. Please request a new one." }
    }

    // Check if too many attempts
    if (otpData.attempts >= 3) {
      removeOTP(email, type)
      return { success: false, message: "Too many incorrect attempts. Please request a new OTP." }
    }

    // Verify OTP
    if (otpData.otp === enteredOTP.trim()) {
      // Remove OTP after successful verification
      removeOTP(email, type)
      clearOTPAttempts(email)
      return { success: true, message: "OTP verified successfully" }
    } else {
      // Increment attempts
      otpData.attempts += 1
      const updatedOTPs = otps.map((o) => (o.email === email.toLowerCase() && o.type === type ? otpData : o))
      localStorage.setItem("learnsphere_otps", JSON.stringify(updatedOTPs))

      const remainingAttempts = 3 - otpData.attempts
      return {
        success: false,
        message:
          remainingAttempts > 0
            ? `Incorrect OTP. ${remainingAttempts} attempts remaining.`
            : "Too many incorrect attempts. Please request a new OTP.",
      }
    }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return { success: false, message: "Failed to verify OTP" }
  }
}

// Rate limiting for OTP generation (3 attempts per 10 minutes)
function checkOTPRateLimit(email: string): { allowed: boolean; message: string } {
  const attempts = getOTPAttempts()
  const userAttempts = attempts.find((a) => a.email === email.toLowerCase())

  if (!userAttempts) return { allowed: true, message: "" }

  // Check if user is locked out
  if (userAttempts.lockedUntil && new Date(userAttempts.lockedUntil) > new Date()) {
    const lockTime = Math.ceil((new Date(userAttempts.lockedUntil).getTime() - Date.now()) / 60000)
    return { allowed: false, message: `Too many OTP requests. Try again in ${lockTime} minutes.` }
  }

  // Check if too many attempts in the last 10 minutes
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
  if (userAttempts.attempts >= 3 && new Date(userAttempts.lastAttempt) > tenMinutesAgo) {
    // Lock for 10 minutes
    userAttempts.lockedUntil = new Date(Date.now() + 10 * 60 * 1000).toISOString()
    saveOTPAttempts(attempts)
    return { allowed: false, message: "Too many OTP requests. Please wait 10 minutes before trying again." }
  }

  // Reset attempts if more than 10 minutes have passed
  if (new Date(userAttempts.lastAttempt) <= tenMinutesAgo) {
    userAttempts.attempts = 0
  }

  return { allowed: true, message: "" }
}

function recordOTPAttempt(email: string): void {
  const attempts = getOTPAttempts()
  const existingAttempt = attempts.find((a) => a.email === email.toLowerCase())

  if (existingAttempt) {
    existingAttempt.attempts += 1
    existingAttempt.lastAttempt = new Date().toISOString()
  } else {
    attempts.push({
      email: email.toLowerCase(),
      attempts: 1,
      lastAttempt: new Date().toISOString(),
    })
  }

  saveOTPAttempts(attempts)
}

function clearOTPAttempts(email: string): void {
  const attempts = getOTPAttempts()
  const filteredAttempts = attempts.filter((a) => a.email !== email.toLowerCase())
  saveOTPAttempts(filteredAttempts)
}

// Helper functions
function getStoredOTPs(): OTPData[] {
  try {
    return JSON.parse(localStorage.getItem("learnsphere_otps") || "[]")
  } catch {
    return []
  }
}

function removeOTP(email: string, type: "signup" | "login"): void {
  const otps = getStoredOTPs()
  const filteredOTPs = otps.filter((o) => !(o.email === email.toLowerCase() && o.type === type))
  localStorage.setItem("learnsphere_otps", JSON.stringify(filteredOTPs))
}

function getOTPAttempts(): OTPAttempt[] {
  try {
    return JSON.parse(localStorage.getItem("learnsphere_otp_attempts") || "[]")
  } catch {
    return []
  }
}

function saveOTPAttempts(attempts: OTPAttempt[]): void {
  localStorage.setItem("learnsphere_otp_attempts", JSON.stringify(attempts))
}

// Clean up expired OTPs (call periodically)
export function cleanupExpiredOTPs(): void {
  const otps = getStoredOTPs()
  const validOTPs = otps.filter((otp) => new Date(otp.expiresAt) > new Date())
  localStorage.setItem("learnsphere_otps", JSON.stringify(validOTPs))
}
