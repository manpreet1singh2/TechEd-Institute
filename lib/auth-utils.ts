type OTPType = "signup" | "login"

interface OTPEntry {
  email: string
  code: string
  type: OTPType
  createdAt: string // ISO date-time
  expiresAt: string // ISO date-time (5 min)
  attempts: number // verification attempts
  requestCount: number // how many times this OTP was (re)generated in 10 min
  lastRequest: string // ISO date-time of last generation
}
const OTP_STORAGE_KEY = "learnsphere_otps"

interface User {
  id: string
  username: string
  email: string
  passwordHash: string
  createdAt: string
}

interface Session {
  token: string
  userId: string
  expiresAt: string
  rememberMe: boolean
}

interface LoginAttempt {
  email: string
  attempts: number
  lastAttempt: string
  lockedUntil?: string
}

// Security: Simple password hashing (NOT production-secure)
// In production, use bcrypt or similar server-side hashing
export function hashPassword(password: string): string {
  // Simple transformation for prototype - NOT SECURE for production
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36) + password.length.toString()
}

// Security: Input sanitization to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove HTML brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .replace(/script/gi, "") // Remove script tags
    .trim()
}

// Security: Validate input for prompt injection patterns
export function validateInput(input: string): boolean {
  const suspiciousPatterns = [
    /ignore/gi,
    /system/gi,
    /prompt/gi,
    /assistant/gi,
    /\x00-\x1f/g, // Control characters
    /<script/gi,
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
  ]

  return !suspiciousPatterns.some((pattern) => pattern.test(input))
}

// Password validation
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return { isValid: errors.length === 0, errors }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/* -------------------------------------------------------------------------- */
/*                               OTP  Utilities                               */
/* -------------------------------------------------------------------------- */

// Save OTP list to localStorage
function saveOTPs(list: OTPEntry[]) {
  localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(list))
}

// Retrieve OTP list from localStorage
function getOTPs(): OTPEntry[] {
  try {
    return JSON.parse(localStorage.getItem(OTP_STORAGE_KEY) || "[]")
  } catch {
    return []
  }
}

// Remove expired OTPs (5-minute TTL)
function purgeExpiredOTPs() {
  const now = Date.now()
  const fresh = getOTPs().filter((otp) => new Date(otp.expiresAt).getTime() > now)
  saveOTPs(fresh)
}

/**
 * Generate & store a 6-digit OTP.
 *
 * Security / Rate-limit rules:
 *  • Max 3 OTPs per email & type within 10 minutes
 *  • Each OTP valid for 5 minutes or 1 successful verification
 */
export function storeOTP(email: string, type: OTPType): { success: boolean; message: string } {
  purgeExpiredOTPs()

  const list = getOTPs()
  const now = Date.now()
  const tenMinutesAgo = now - 10 * 60 * 1000
  const recent = list.filter(
    (o) => o.email === email && o.type === type && new Date(o.lastRequest).getTime() > tenMinutesAgo,
  )

  if (recent.length >= 3) {
    return {
      success: false,
      message: "OTP limit reached. Please wait a few minutes before trying again.",
    }
  }

  // Create a cryptographically-secure 6-digit code
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  const code = (buf[0] % 1_000_000).toString().padStart(6, "0")

  // For demo: output to console (NEVER do this in prod)
  // eslint-disable-next-line no-console
  console.info(`OTP for ${email} (${type}):`, code)

  const entry: OTPEntry = {
    email,
    code,
    type,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 5 * 60 * 1000).toISOString(),
    attempts: 0,
    requestCount: recent.length + 1,
    lastRequest: new Date(now).toISOString(),
  }

  // Replace any previous entry of same email&type
  const filtered = list.filter((o) => !(o.email === email && o.type === type))
  saveOTPs([...filtered, entry])

  return { success: true, message: "OTP generated. Check the console for your code." }
}

/**
 * Verify a 6-digit OTP.
 * Allows max 3 attempts per code before forcing regeneration.
 */
export function verifyOTP(email: string, type: OTPType, code: string): { success: boolean; message: string } {
  purgeExpiredOTPs()

  const list = getOTPs()
  const idx = list.findIndex((o) => o.email === email && o.type === type)

  if (idx === -1) return { success: false, message: "No OTP found. Please request a new one." }

  const otp = list[idx]

  if (new Date(otp.expiresAt) < new Date()) {
    return { success: false, message: "OTP expired. Please request a new one." }
  }

  if (otp.attempts >= 3) {
    return { success: false, message: "Too many incorrect attempts. Please request a new OTP." }
  }

  if (otp.code !== code) {
    otp.attempts += 1
    list[idx] = otp
    saveOTPs(list)
    const left = 3 - otp.attempts
    return { success: false, message: `Incorrect OTP. You have ${left} attempt${left === 1 ? "" : "s"} left.` }
  }

  // Success – remove OTP
  const updated = list.filter((o) => !(o.email === email && o.type === type))
  saveOTPs(updated)
  return { success: true, message: "OTP verified successfully!" }
}

// Generate secure session token
export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

// User management
export function createUser(
  username: string,
  email: string,
  password: string,
): { success: boolean; message: string; user?: User; requiresOTP?: boolean } {
  try {
    // Sanitize inputs
    const cleanUsername = sanitizeInput(username)
    const cleanEmail = sanitizeInput(email.toLowerCase())

    // Validate inputs
    if (!validateInput(cleanUsername) || !validateInput(cleanEmail)) {
      return { success: false, message: "Invalid input detected" }
    }

    if (cleanUsername.length < 3) {
      return { success: false, message: "Username must be at least 3 characters long" }
    }

    if (!validateEmail(cleanEmail)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.errors.join(". ") }
    }

    // Check for existing users
    const existingUsers = getUsers()
    if (existingUsers.some((user) => user.email === cleanEmail)) {
      return { success: false, message: "An account with this email already exists" }
    }

    if (existingUsers.some((user) => user.username.toLowerCase() === cleanUsername.toLowerCase())) {
      return { success: false, message: "This username is already taken" }
    }

    // Don't create user yet, just validate and prepare for OTP
    return {
      success: true,
      message: "Please verify your email with the OTP sent to you",
      requiresOTP: true,
    }
  } catch (error) {
    console.error("Error preparing user creation:", error)
    return { success: false, message: "An error occurred while preparing your account" }
  }
}

export function completeUserCreation(
  username: string,
  email: string,
  password: string,
): { success: boolean; message: string; user?: User } {
  try {
    // Sanitize inputs
    const cleanUsername = sanitizeInput(username)
    const cleanEmail = sanitizeInput(email.toLowerCase())

    // Create new user
    const user: User = {
      id: generateSessionToken(),
      username: cleanUsername,
      email: cleanEmail,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    }

    // Save user
    const existingUsers = getUsers()
    existingUsers.push(user)
    localStorage.setItem("learnsphere_users", JSON.stringify(existingUsers))

    return { success: true, message: "Account created successfully!", user }
  } catch (error) {
    console.error("Error completing user creation:", error)
    return { success: false, message: "An error occurred while creating your account" }
  }
}

// Login with rate limiting
export function loginUser(
  email: string,
  password: string,
  rememberMe = false,
): { success: boolean; message: string; user?: User; requiresOTP?: boolean } {
  try {
    const cleanEmail = sanitizeInput(email.toLowerCase())

    // Check rate limiting
    const rateLimitResult = checkRateLimit(cleanEmail)
    if (!rateLimitResult.allowed) {
      return { success: false, message: rateLimitResult.message }
    }

    // Validate inputs
    if (!validateInput(cleanEmail) || !validateInput(password)) {
      recordFailedAttempt(cleanEmail)
      return { success: false, message: "Invalid input detected" }
    }

    // Find user
    const users = getUsers()
    const user = users.find((u) => u.email === cleanEmail)

    if (!user || user.passwordHash !== hashPassword(password)) {
      recordFailedAttempt(cleanEmail)
      return { success: false, message: "Incorrect email or password" }
    }

    // Clear failed attempts on valid credentials
    clearFailedAttempts(cleanEmail)

    // Return success but require OTP verification
    return {
      success: true,
      message: "Please verify your identity with the OTP sent to your email",
      user,
      requiresOTP: true,
    }
  } catch (error) {
    console.error("Error during login:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export function completeLogin(user: User, rememberMe = false): { success: boolean; message: string } {
  try {
    // Create session
    const session: Session = {
      token: generateSessionToken(),
      userId: user.id,
      expiresAt: new Date(Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)).toISOString(),
      rememberMe,
    }

    localStorage.setItem("learnsphere_session", JSON.stringify(session))

    return { success: true, message: "Login successful!" }
  } catch (error) {
    console.error("Error completing login:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

// Rate limiting functions
function checkRateLimit(email: string): { allowed: boolean; message: string } {
  const attempts = getLoginAttempts()
  const userAttempts = attempts.find((a) => a.email === email)

  if (!userAttempts) return { allowed: true, message: "" }

  // Check if user is locked out
  if (userAttempts.lockedUntil && new Date(userAttempts.lockedUntil) > new Date()) {
    const lockTime = Math.ceil((new Date(userAttempts.lockedUntil).getTime() - Date.now()) / 60000)
    return { allowed: false, message: `Account temporarily locked. Try again in ${lockTime} minutes.` }
  }

  // Check if too many attempts in the last 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  if (userAttempts.attempts >= 5 && new Date(userAttempts.lastAttempt) > fiveMinutesAgo) {
    // Lock account for 5 minutes
    userAttempts.lockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString()
    saveLoginAttempts(attempts)
    return { allowed: false, message: "Too many failed attempts. Account locked for 5 minutes." }
  }

  return { allowed: true, message: "" }
}

function recordFailedAttempt(email: string): void {
  const attempts = getLoginAttempts()
  const existingAttempt = attempts.find((a) => a.email === email)

  if (existingAttempt) {
    existingAttempt.attempts += 1
    existingAttempt.lastAttempt = new Date().toISOString()
  } else {
    attempts.push({
      email,
      attempts: 1,
      lastAttempt: new Date().toISOString(),
    })
  }

  saveLoginAttempts(attempts)
}

function clearFailedAttempts(email: string): void {
  const attempts = getLoginAttempts()
  const filteredAttempts = attempts.filter((a) => a.email !== email)
  saveLoginAttempts(filteredAttempts)
}

// Helper functions for localStorage
function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem("learnsphere_users") || "[]")
  } catch {
    return []
  }
}

function getLoginAttempts(): LoginAttempt[] {
  try {
    return JSON.parse(localStorage.getItem("learnsphere_login_attempts") || "[]")
  } catch {
    return []
  }
}

function saveLoginAttempts(attempts: LoginAttempt[]): void {
  localStorage.setItem("learnsphere_login_attempts", JSON.stringify(attempts))
}

// Session management
export function getCurrentUser(): User | null {
  try {
    const sessionData = localStorage.getItem("learnsphere_session")
    if (!sessionData) return null

    const session: Session = JSON.parse(sessionData)

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      logout()
      return null
    }

    // Find user
    const users = getUsers()
    return users.find((u) => u.id === session.userId) || null
  } catch {
    return null
  }
}

export function logout(): void {
  localStorage.removeItem("learnsphere_session")
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null
}
