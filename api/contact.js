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
    const { name, email, phone, message } = req.body

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
      subject: `📧 Contact Form Message from ${name} - TechMindsHub`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Message - TechMindsHub
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
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    })
  }
}
