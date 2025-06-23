// Environment setup script for Gmail configuration
console.log("Setting up environment variables for TechEd Institute website...")

const envTemplate = `
# Gmail Configuration for Contact Forms
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Instructions:
# 1. Replace 'your-email@gmail.com' with your actual Gmail address
# 2. Generate an App Password in your Google Account settings:
#    - Go to Google Account settings
#    - Security > 2-Step Verification > App passwords
#    - Generate a new app password for 'Mail'
#    - Replace 'your-app-password' with the generated password
# 3. Save this file as .env.local in your project root
`

console.log("Environment template:")
console.log(envTemplate)

console.log("\nNext steps:")
console.log("1. Create a .env.local file in your project root")
console.log("2. Copy the template above and configure your Gmail credentials")
console.log("3. Enable 2-Factor Authentication on your Gmail account")
console.log("4. Generate an App Password for the application")
console.log("5. Test the contact forms after configuration")
