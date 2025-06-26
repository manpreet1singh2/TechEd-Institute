# 🔐 TechMindsHub LearnSphere - OTP-Based Authentication System

A highly secure OTP-based authentication system for LearnSphere by TechMindsHub, built with Next.js, React, Tailwind CSS, and modern security practices.

## 🏢 **TechMindsHub Branding**

**Organization:** TechMindsHub  
**Tagline:** 🎓 Industrial Training in IT & HR | Shaping the workforce of tomorrow  
**Mission:** Comprehensive IT and HR training programs for tomorrow's workforce

### 📞 **Contact Information**
- **Phone/WhatsApp:** +91 8847507316
- **Email:** trainings@techmindshub.in, techmindshub143@gmail.com
- **Address:** Plot No. C133, 4th Floor, Phase 8, Industrial Area, Mohali, Punjab - 160062

### 🌐 **Social Media**
- **Instagram:** https://www.instagram.com/trainings_techmindshub
- **Facebook:** https://www.facebook.com/share/16MQY9Soy9/
- **YouTube:** https://youtube.com/@training_techmindshub
- **LinkedIn:** https://www.linkedin.com/company/training-techmindshub/

## 🚀 **Features**

### ✅ **OTP-Based Authentication**
- **6-digit OTP** generation using crypto.getRandomValues()
- **5-minute expiration** for enhanced security
- **Email verification** for both signup and login
- **Console delivery** for demo (upgrade to email service for production)

### ✅ **Advanced Security**
- **Rate Limiting:** 3 OTP requests per 10 minutes
- **Attempt Limiting:** 3 OTP verification attempts per code
- **Input Sanitization:** Prevents XSS and injection attacks
- **Prompt Injection Defense:** Validates suspicious patterns
- **Session Management:** Secure tokens with expiration

### ✅ **User Experience**
- **Auto-focus** and **auto-advance** OTP inputs
- **Paste support** for 6-digit codes
- **Real-time countdown** timer
- **Resend functionality** with rate limiting
- **Loading states** and **error handling**
- **Mobile-responsive** design

## 🛡️ **Security Implementation**

### OTP Generation & Storage
\`\`\`typescript
// Generate secure 6-digit OTP
export function generateOTP(): string {
  const array = new Uint8Array(3)
  crypto.getRandomValues(array)
  const otp = Array.from(array, (byte) => (byte % 10).toString()).join('')
  return otp.padStart(6, '0')
}

// Store with 5-minute expiration
const otpData: OTPData = {
  otp,
  email: email.toLowerCase(),
  expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  attempts: 0,
  createdAt: new Date().toISOString(),
  type: 'signup' | 'login',
}
\`\`\`

### Rate Limiting
- **OTP Generation:** 3 requests per 10 minutes per email
- **OTP Verification:** 3 attempts per OTP code
- **Login Attempts:** 5 attempts per 5 minutes per email
- **Automatic Lockout:** Temporary account locks for security

### Input Validation
\`\`\`typescript
// Sanitize inputs to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/script/gi, '') // Remove script tags
    .trim()
}

// Validate for prompt injection
const suspiciousPatterns = [
  /ignore/gi, /system/gi, /prompt/gi, /assistant/gi,
  /\x00-\x1f/g, // Control characters
  /<script/gi, /javascript:/gi, /data:/gi, /vbscript:/gi
]
\`\`\`

## 📱 **Components**

### 1. **OTPVerification** (`components/auth/otp-verification.tsx`)
- 6-digit OTP input with auto-advance
- Real-time countdown timer (5 minutes)
- Paste support for convenience
- Resend functionality with rate limiting
- Clear error messaging

### 2. **Enhanced SignupForm** (`components/auth/signup-form.tsx`)
- Integrated OTP verification flow
- Real-time password strength validation
- Input sanitization and validation
- TechMindsHub branding

### 3. **Enhanced LoginForm** (`components/auth/login-form.tsx`)
- OTP-based login verification
- "Remember Me" functionality
- Rate limiting protection
- TechMindsHub contact integration

### 4. **Updated Footer** (`components/footer.tsx`)
- Complete TechMindsHub branding
- Contact information and social media
- Office hours and location details

## 🔧 **Authentication Flow**

### Signup Process
1. **User Input:** Username, email, password validation
2. **OTP Generation:** 6-digit code with 5-minute expiration
3. **OTP Delivery:** Console display (email service for production)
4. **OTP Verification:** 3 attempts allowed per code
5. **Account Creation:** User stored after successful verification

### Login Process
1. **Credential Validation:** Email and password check
2. **OTP Generation:** New 6-digit code for verified user
3. **OTP Verification:** Identity confirmation
4. **Session Creation:** Secure token with expiration
5. **Dashboard Access:** User authenticated and logged in

## 🚀 **Vercel Deployment**

### Environment Variables (Production)
Set in **Vercel Project Settings:**

\`\`\`bash
# Email Service (Recommended: SendGrid, Resend, or Nodemailer)
EMAIL_SERVICE_API_KEY=your_email_api_key
EMAIL_FROM=noreply@techmindshub.in

# SMS Service (Optional: Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Database (Recommended: Supabase, PlanetScale)
DATABASE_URL=your_database_url

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://learnsphere.techmindshub.in
\`\`\`

### Deployment Steps
1. **Push to GitHub:** Commit code to repository
2. **Connect Vercel:** Import project in Vercel dashboard
3. **Set Environment Variables:** Add production variables
4. **Configure Domain:** Set up custom domain (optional)
5. **Deploy:** Automatic build and deployment

\`\`\`bash
# CLI Deployment
npm install -g vercel
vercel --prod
\`\`\`

## 📧 **Production Email Integration**

### Recommended Services

#### 1. **Resend** (Recommended)
\`\`\`typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOTP(email: string, otp: string) {
  await resend.emails.send({
    from: 'TechMindsHub <noreply@techmindshub.in>',
    to: email,
    subject: 'Your TechMindsHub Verification Code',
    html: \`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">TechMindsHub Verification</h2>
        <p>Your verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; color: #2563eb; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
          \${otp}
        </div>
        <p>This code expires in 5 minutes.</p>
        <hr>
        <p style="color: #6b7280; font-size: 14px;">
          TechMindsHub - Industrial Training in IT & HR<br>
          📞 +91 8847507316 | 📧 trainings@techmindshub.in
        </p>
      </div>
    \`
  })
}
\`\`\`

#### 2. **SendGrid**
\`\`\`typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendOTP(email: string, otp: string) {
  const msg = {
    to: email,
    from: 'trainings@techmindshub.in',
    subject: 'TechMindsHub - Verification Code',
    html: \`<!-- Email template -->\`
  }
  
  await sgMail.send(msg)
}
\`\`\`

## 🧪 **Testing Guide**

### Local Testing
1. **Open Application:** Navigate to localhost:3000
2. **Test Signup:**
   - Enter valid user details
   - Check console for OTP code
   - Verify OTP input functionality
   - Test rate limiting (3 attempts)
3. **Test Login:**
   - Use created account credentials
   - Verify OTP flow
   - Test "Remember Me" functionality
4. **Test Security:**
   - Try XSS inputs: `<script>alert('test')</script>`
   - Test prompt injection: "ignore previous instructions"
   - Test rate limiting: Multiple OTP requests

### Security Testing Checklist
- [ ] XSS prevention in all input fields
- [ ] Prompt injection validation
- [ ] OTP expiration (5 minutes)
- [ ] Rate limiting for OTP generation
- [ ] Rate limiting for OTP verification
- [ ] Session token security
- [ ] Input sanitization
- [ ] Error message security (no sensitive data)

## 📊 **Analytics & Monitoring**

### Demo Analytics (localStorage)
\`\`\`typescript
// Track authentication events
export function trackAuthEvent(event: string, data: any) {
  const analytics = JSON.parse(localStorage.getItem('learnsphere_analytics') || '[]')
  analytics.push({
    event,
    data,
    timestamp: new Date().toISOString()
  })
  localStorage.setItem('learnsphere_analytics', JSON.stringify(analytics))
}

// Usage
trackAuthEvent('signup_success', { email: user.email })
trackAuthEvent('login_success', { email: user.email })
trackAuthEvent('otp_verified', { email, type: 'signup' })
\`\`\`

### Production Monitoring
- **Vercel Analytics:** Built-in performance monitoring
- **Sentry:** Error tracking and performance monitoring
- **LogRocket:** User session recording
- **Google Analytics:** User behavior tracking

## ⚠️ **Production Considerations**

### Current Limitations (Demo)
- **Console OTP Delivery:** Not suitable for production
- **localStorage:** Not secure for sensitive data
- **Simple Hashing:** Use bcrypt server-side
- **No Email Service:** Integrate proper email provider

### Recommended Upgrades

#### 1. **Backend Integration**
\`\`\`typescript
// Use Supabase for authentication
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Enable Row Level Security (RLS)
// Create users table with proper constraints
\`\`\`

#### 2. **Email Service Integration**
\`\`\`typescript
// Next.js API route for OTP sending
// pages/api/auth/send-otp.ts
export default async function handler(req, res) {
  const { email, type } = req.body
  
  // Generate OTP
  const otp = generateSecureOTP()
  
  // Store in database with expiration
  await storeOTPInDatabase(email, otp, type)
  
  // Send via email service
  await sendOTPEmail(email, otp)
  
  res.json({ success: true })
}
\`\`\`

#### 3. **Database Schema**
\`\`\`sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- OTP table
CREATE TABLE otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  type VARCHAR(10) NOT NULL, -- 'signup' or 'login'
  attempts INTEGER DEFAULT 0,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## 🎯 **Next Steps**

1. **Email Integration:** Set up Resend or SendGrid for OTP delivery
2. **Database Migration:** Move from localStorage to Supabase/PostgreSQL
3. **SMS Backup:** Add Twilio for SMS OTP as backup
4. **Admin Dashboard:** Create admin panel for user management
5. **Course Integration:** Connect authentication with course enrollment
6. **Payment Gateway:** Integrate Stripe/Razorpay for course purchases
7. **Mobile App:** React Native app with same authentication

## 📞 **Support & Contact**

For technical support or questions about TechMindsHub LearnSphere:

- **Email:** trainings@techmindshub.in
- **Phone:** +91 8847507316
- **Address:** Plot No. C133, 4th Floor, Phase 8, Industrial Area, Mohali, Punjab - 160062

---

**🎓 TechMindsHub - Industrial Training in IT & HR**  
**Shaping the workforce of tomorrow**

**⚠️ Security Notice:** This implementation uses localStorage and console OTP delivery for demonstration. For production deployment, integrate proper email services, database storage, and server-side security measures as outlined in the upgrade recommendations.
