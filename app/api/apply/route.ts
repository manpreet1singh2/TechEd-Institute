import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    // Lazily create the client so build-time evaluation won’t need the key
    const resend = new Resend(process.env.RESEND_API_KEY ?? "")

    const { fullName, email, phone, course, duration, message } = await request.json<{
      fullName: string
      email: string
      phone: string
      course: string
      duration: string
      message?: string
    }>()

    /* basic validation */
    if (![fullName, email, phone, course, duration].every(Boolean)) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 })
    }

    /* send email */
    await resend.emails.send({
      from: "TechEd Institute <onboarding@resend.dev>",
      to: process.env.GMAIL_USER!,
      reply_to: email,
      subject: `🎓 New Course Application – ${course}`,
      html: `
        <h2>Application Details</h2>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Course:</strong> ${course}</li>
          <li><strong>Duration:</strong> ${duration}</li>
        </ul>
        <p>${message || "No additional message."}</p>
        <hr />
        <small>Submitted ${new Date().toLocaleString()}</small>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Resend error:", err)
    return NextResponse.json({ success: false, message: "Mail service failed" }, { status: 500 })
  }
}
