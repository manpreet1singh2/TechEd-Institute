const nodemailer = require("nodemailer")

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { fullName, email, phone, course, duration, message } = req.body

    // Validation
    if (!fullName || !email || !phone || !course || !duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      })
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `🎓 New Course Application - ${course}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Course Application - TechMindsHub
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Student Details:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Course:</strong> ${course}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
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
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to send application. Please try again.",
    })
  }
}
