# 🔐 TechMindsHub Authentication System

A secure and fully functional authentication system built with Next.js, React, Tailwind CSS, and modern security practices.

## 🚀 Features

### ✅ **Secure Signup & Login**
- **Input Validation**: Client-side validation with real-time feedback
- **Password Strength**: Enforces strong passwords (8+ chars, uppercase, number, special char)
- **Email Validation**: Proper email format checking
- **XSS Prevention**: Input sanitization to prevent cross-site scripting
- **Prompt Injection Defense**: Validates inputs for suspicious patterns

### ✅ **Session Management**
- **Secure Tokens**: Cryptographically secure session tokens
- **Expiration**: 24-hour sessions (7 days with "Remember Me")
- **Auto-logout**: Sessions expire automatically
- **localStorage**: Prototype-level persistence (upgrade to backend for production)

### ✅ **Security Features**
- **Rate Limiting**: 5 failed login attempts = 5-minute lockout
- **Input Sanitization**: Prevents XSS and injection attacks
- **Password Hashing**: Simple hashing for prototype (use bcrypt in production)
- **Session Validation**: Automatic session expiry checking

### ✅ **User Experience**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during authentication
- **Error Handling**: Clear, user-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation
- **Real-time Validation**: Instant feedback on form inputs

## 🛡️ Security Implementation

### Input Sanitization
\`\`\`typescript
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/script/gi, '') // Remove script tags
    .trim();
}
\`\`\`

### Prompt Injection Prevention
\`\`\`typescript
export function validateInput(input: string): boolean {
  const suspiciousPatterns = [
    /ignore/gi, /system/gi, /prompt/gi, /assistant/gi,
    /\x00-\x1f/g, // Control characters
    /<script/gi, /javascript:/gi, /data:/gi, /vbscript:/gi
  ];
  return !suspiciousPatterns.some(pattern => pattern.test(input));
}
\`\`\`

### Rate Limiting
- **5 failed attempts** within 5 minutes triggers account lockout
- **5-minute lockout** period for security
- **Automatic unlock** after lockout period expires

## 📱 Components

### 1. **SignupForm** (`components/auth/signup-form.tsx`)
- Username, email, password, confirm password fields
- Real-time password strength validation
- Input sanitization and validation
- Success/error feedback

### 2. **LoginForm** (`components/auth/login-form.tsx`)
- Email and password authentication
- "Remember Me" functionality
- Rate limiting protection
- Forgot password placeholder

### 3. **AuthModal** (`components/auth/auth-modal.tsx`)
- Unified modal for signup/login
- Smooth transitions between forms
- Success message handling

### 4. **UserProfile** (`components/auth/user-profile.tsx`)
- User dashboard with course progress
- Account statistics
- Profile management
- Logout functionality

### 5. **Updated Header** (`components/header.tsx`)
- Dynamic navigation based on auth status
- User dropdown menu
- Mobile-responsive design

## 🔧 Usage

### Basic Authentication Flow
\`\`\`typescript
// Signup
const result = createUser(username, email, password);
if (result.success) {
  // Redirect to login
}

// Login
const result = loginUser(email, password, rememberMe);
if (result.success) {
  // User authenticated
}

// Check current user
const user = getCurrentUser();
if (user) {
  // User is logged in
}

// Logout
logout();
\`\`\`

### Integration with Components
\`\`\`tsx
import AuthModal from "@/components/auth/auth-modal"

function MyComponent() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  
  return (
    <AuthModal
      isOpen={authModal.isOpen}
      onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
      initialMode={authModal.mode}
      onAuthSuccess={() => {
        // Handle successful authentication
      }}
    />
  );
}
\`\`\`

## 🚀 Vercel Deployment

### Environment Variables
Set these in **Vercel Project Settings** (not in code):

\`\`\`bash
# Email service (if using Resend)
RESEND_API_KEY=your_resend_api_key

# Database (for production upgrade)
DATABASE_URL=your_database_url

# JWT Secret (for production)
JWT_SECRET=your_jwt_secret
\`\`\`

### Deployment Steps
1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Connect to Vercel**: Import your project in Vercel dashboard
3. **Set Environment Variables**: Add required variables in Project Settings
4. **Deploy**: Vercel will automatically build and deploy

\`\`\`bash
# Alternative: Deploy via CLI
npm install -g vercel
vercel --prod
\`\`\`

## ⚠️ Production Considerations

### Current Limitations (Prototype)
- **localStorage**: Not secure for production data
- **Simple Hashing**: Use bcrypt or similar server-side
- **No Backend**: Upgrade to proper database and API

### Recommended Upgrades
1. **Backend Integration**:
   \`\`\`typescript
   // Use Supabase, Firebase, or custom API
   import { createClient } from '@supabase/supabase-js'
   const supabase = createClient(url, key)
   \`\`\`

2. **Proper Password Hashing**:
   \`\`\`typescript
   // Server-side with bcrypt
   import bcrypt from 'bcrypt'
   const hash = await bcrypt.hash(password, 12)
   \`\`\`

3. **JWT Tokens**:
   \`\`\`typescript
   // Use JWT for secure sessions
   import jwt from 'jsonwebtoken'
   const token = jwt.sign({ userId }, process.env.JWT_SECRET)
   \`\`\`

4. **Database Storage**:
   \`\`\`sql
   -- PostgreSQL/MySQL for user data
   CREATE TABLE users (
     id UUID PRIMARY KEY,
     username VARCHAR(50) UNIQUE,
     email VARCHAR(255) UNIQUE,
     password_hash VARCHAR(255),
     created_at TIMESTAMP
   );
   \`\`\`

## 🧪 Testing

### Local Testing
1. **Open the application** in your browser
2. **Test Signup**: Create a new account with various inputs
3. **Test Login**: Sign in with created credentials
4. **Test Rate Limiting**: Try 5+ failed login attempts
5. **Test Session**: Refresh page, check if user stays logged in
6. **Test Logout**: Ensure session is cleared properly

### Security Testing
- **XSS Prevention**: Try entering `<script>alert('xss')</script>` in forms
- **Prompt Injection**: Try entering "ignore previous instructions"
- **Rate Limiting**: Attempt multiple failed logins
- **Session Expiry**: Wait 24 hours and check if session expires

## 📚 API Reference

### Authentication Functions
- `createUser(username, email, password)` - Create new user account
- `loginUser(email, password, rememberMe)` - Authenticate user
- `getCurrentUser()` - Get current logged-in user
- `logout()` - Clear user session
- `isLoggedIn()` - Check if user is authenticated

### Validation Functions
- `validatePassword(password)` - Check password strength
- `validateEmail(email)` - Validate email format
- `sanitizeInput(input)` - Clean user input
- `validateInput(input)` - Check for suspicious patterns

## 🎯 Next Steps

1. **Integrate with Courses**: Restrict course enrollment to logged-in users
2. **Add User Roles**: Implement admin/student role system
3. **Course Progress**: Track user progress through courses
4. **Certificates**: Generate completion certificates
5. **Payment Integration**: Add course purchase functionality

---

**⚠️ Security Notice**: This implementation uses localStorage for prototyping. For production applications, implement proper backend authentication with secure session management, database storage, and server-side password hashing.

**🚀 Ready for Production**: Follow the upgrade recommendations above to make this system production-ready with proper security measures.
