# 🚀 TechMindsHub Website - Vercel Deployment Guide

A complete step-by-step guide to deploy the educational institute website on Vercel with full functionality including email forms, environment variables, and production-ready configuration.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Gmail account for email functionality
- ✅ Node.js installed locally (for testing)

---

## 🏗️ Step 1: Project Structure Setup

### Required File Structure:
\`\`\`
techmindshub-website/
├── api/
��   ├── apply.js          # Serverless function for applications
│   └── contact.js        # Serverless function for contact form
├── public/
│   ├── index.html        # Main frontend file
│   ├── css/
│   │   └── style.css     # Custom styles
│   ├── js/
│   │   └── script.js     # Frontend JavaScript
│   └── images/           # Website images
├── package.json          # Dependencies
├── vercel.json          # Vercel configuration
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # Documentation
\`\`\`

---

## 🔧 Step 2: Create Required Files

### 2.1 Create `package.json`
\`\`\`json
{
  "name": "techmindshub-website",
  "version": "1.0.0",
  "description": "Educational institute website with 11 professional courses",
  "main": "index.js",
  "scripts": {
    "dev": "vercel dev",
    "build": "echo 'No build step required'",
    "start": "vercel dev"
  },
  "dependencies": {
    "nodemailer": "^6.9.7",
    "cors": "^2.8.5"
  },
  "engines": {
    "node": "18.x"
  }
}
\`\`\`

### 2.2 Create `vercel.json`
\`\`\`json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    },
    {
      "src": "api/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ],
  "functions": {
    "api/*.js": {
      "maxDuration": 10
    }
  }
}
\`\`\`

### 2.3 Create `.env.example`
\`\`\`env
# Gmail Configuration for Email Sending
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
\`\`\`

### 2.4 Create `.gitignore`
\`\`\`gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
logs
*.log
\`\`\`

---

## 📧 Step 3: Gmail App Password Setup

### 3.1 Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### 3.2 Generate App Password
1. Go to **Security** → **App passwords**
2. Select **Mail** and **Other (Custom name)**
3. Enter "TechMindsHub Website" as the name
4. Copy the **16-character password** (save it securely)

### 3.3 Test Gmail Configuration
\`\`\`javascript
// Test script (run locally)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-16-character-app-password'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Gmail setup failed:', error);
  } else {
    console.log('✅ Gmail setup successful!');
  }
});
\`\`\`

---

## 🔧 Step 4: Create Serverless Functions

### 4.1 Create `api/apply.js`
\`\`\`javascript
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, course, duration, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !course || !duration) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `🎓 New Course Application - ${course}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Course Application
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Student Details:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Course:</strong> ${course}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #1e40af;">
              <strong>📅 Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This email was sent from TechMindsHub website application form.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully!' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send application. Please try again.' 
    });
  }
}
\`\`\`

### 4.2 Create `api/contact.js`
\`\`\`javascript
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `📧 Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Message
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          <div style="background: #fff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #1e40af;">
              <strong>📅 Received:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This email was sent from TechMindsHub website contact form.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
}
\`\`\`

---

## 🌐 Step 5: Frontend Integration

### 5.1 Update JavaScript for API calls
\`\`\`javascript
// In your public/js/script.js file

// Apply Now Form Handler
async function handleApplyForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    course: formData.get('course'),
    duration: formData.get('duration'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      showAlert('success', 'Application submitted successfully!');
      event.target.reset();
      // Close modal if using Bootstrap modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('applyModal'));
      if (modal) modal.hide();
    } else {
      showAlert('error', result.message || 'Failed to submit application');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('error', 'Network error. Please try again.');
  }
}

// Contact Form Handler
async function handleContactForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      showAlert('success', 'Message sent successfully!');
      event.target.reset();
    } else {
      showAlert('error', result.message || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('error', 'Network error. Please try again.');
  }
}

// Alert function
function showAlert(type, message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.insertBefore(alertDiv, document.body.firstChild);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Attach event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const applyForm = document.getElementById('applyForm');
  const contactForm = document.getElementById('contactForm');
  
  if (applyForm) {
    applyForm.addEventListener('submit', handleApplyForm);
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
});
\`\`\`

---

## 🚀 Step 6: Deploy to Vercel

### 6.1 GitHub Repository Setup
1. Create a new repository on GitHub
2. Push your code:
\`\`\`bash
git init
git add .
git commit -m "Initial commit: TechMindsHub website"
git branch -M main
git remote add origin https://github.com/yourusername/techmindshub-website.git
git push -u origin main
\`\`\`

### 6.2 Vercel Deployment
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave default)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

### 6.3 Environment Variables Setup
1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add the following variables:
   \`\`\`
   GMAIL_USER = your-email@gmail.com
   GMAIL_APP_PASSWORD = your-16-character-app-password
   \`\`\`
3. Click **"Add"** for each variable

### 6.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Your site will be available at `https://your-project-name.vercel.app`

---

## 🧪 Step 7: Testing & Verification

### 7.1 Test Checklist
- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Apply Now form works
- [ ] Contact form works
- [ ] Email notifications received
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### 7.2 Test Forms
1. **Apply Now Form**:
   - Fill out all required fields
   - Submit form
   - Check for success message
   - Verify email received in Gmail

2. **Contact Form**:
   - Fill out all fields
   - Submit form
   - Check for success message
   - Verify email received in Gmail

### 7.3 Debug Common Issues
\`\`\`javascript
// Add this to your serverless functions for debugging
console.log('Environment variables check:');
console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Set' : 'Not set');
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');
\`\`\`

---

## 🔧 Step 8: Production Optimizations

### 8.1 Performance Optimizations
\`\`\`json
// Add to vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
\`\`\`

### 8.2 Security Headers
\`\`\`json
// Add to vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
\`\`\`

---

## 🎯 Step 9: Custom Domain (Optional)

### 9.1 Add Custom Domain
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your domain (e.g., `techmindshub.com`)
3. Configure DNS records as instructed
4. Wait for SSL certificate generation

### 9.2 DNS Configuration
\`\`\`
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
\`\`\`

---

## 📊 Step 10: Monitoring & Analytics

### 10.1 Vercel Analytics
1. Enable Vercel Analytics in project settings
2. View performance metrics in dashboard

### 10.2 Google Analytics (Optional)
\`\`\`html
<!-- Add to your HTML head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
\`\`\`

---

## 🆘 Troubleshooting

### Common Issues & Solutions

#### 1. Email Not Sending
\`\`\`javascript
// Check Gmail settings
- Verify 2FA is enabled
- Use App Password, not regular password
- Check spam folder
- Verify environment variables are set
\`\`\`

#### 2. 500 Internal Server Error
\`\`\`javascript
// Check Vercel function logs
- Go to Vercel dashboard → Functions tab
- Check error logs
- Verify all dependencies are installed
\`\`\`

#### 3. CORS Issues
\`\`\`javascript
// Ensure CORS headers are set in API functions
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
\`\`\`

#### 4. Form Validation Errors
\`\`\`javascript
// Add client-side validation
function validateForm(data) {
  const errors = [];
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.phone || !/^\+?[\d\s-()]+$/.test(data.phone)) {
    errors.push('Valid phone number is required');
  }
  
  return errors;
}
\`\`\`

---

## ✅ Final Checklist

Before going live, ensure:

- [ ] All forms work correctly
- [ ] Email notifications are received
- [ ] Website is mobile-responsive
- [ ] All links work properly
- [ ] Images load correctly
- [ ] SSL certificate is active
- [ ] Environment variables are set
- [ ] Error handling is implemented
- [ ] Performance is optimized
- [ ] SEO meta tags are added

---

## 🎉 Congratulations!

Your TechMindsHub educational institute website is now live on Vercel with full functionality including:

- ✅ **Professional design** with Bootstrap 5 & Tailwind CSS
- ✅ **Working contact forms** with email notifications
- ✅ **Course application system** 
- ✅ **Mobile-responsive design**
- ✅ **Production-ready deployment**
- ✅ **Secure environment variables**
- ✅ **Fast global CDN delivery**

Your website is now ready to accept student applications and inquiries!

---

## 📞 Support

If you encounter any issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test email configuration locally
4. Review this guide step-by-step

**Happy coding! 🚀**
\`\`\`

\`\`\`plaintext file=".env.example"
# Gmail Configuration for Email Sending
# Replace with your actual Gmail credentials
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Contact Information
INSTITUTE_EMAIL=contact@techmindshub.com
INSTITUTE_PHONE=+1-234-567-8900
