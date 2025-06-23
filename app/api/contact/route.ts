import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY ?? "")
    const { name, email, phone, message } = await request.json<{
      name: string
      email: string
      phone: string
      message: string
    }>()

    if (![name, email, phone, message].every(Boolean)) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    await resend.emails.send({
      from: "TechEd Institute <support@resend.dev>",
      to: process.env.GMAIL_USER!,
      reply_to: email,
      subject: `📧 Contact form – ${name}`,
      html: `
        <h2>New message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p style="white-space:pre-wrap">${message}</p>
        <hr />
        <small>Sent ${new Date().toLocaleString()}</small>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Resend error:", err)
    return NextResponse.json({ success: false, message: "Mail service failed" }, { status: 500 })
  }
}
